import {
  EuiButton,
  EuiButtonIcon,
  EuiContextMenu,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiTabbedContent,
  EuiTitle,
} from '@elastic/eui'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { useEffect, useState, useCallback, useMemo } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import clientService from '../services/client.service'
import { Client } from '../models/client'
import { BureauData } from '../models/bureauData'
import { useSnackBar } from '../contexts/snackbar'
import { AxiosError } from 'axios'
import { translateFeatureToFrench } from './../core/constants/featureTranslations'
import DoneIcon from '@mui/icons-material/Done'
import LinearProgress from '@mui/material/LinearProgress'
import Papa from 'papaparse'
import { BarChart } from '@mui/x-charts'
import { BallTriangle } from 'react-loader-spinner'

const HomeForm = () => {
  // State for Credit Simulation Form
  const [client, setClient] = useState<Client>()
  const [skId, setSkId] = useState('')
  const [amountCredit, setAmountCredit] = useState('')
  const [creditScore, setCreditScore] = useState<number | undefined>(undefined)
  const { showSnackBar } = useSnackBar()
  const [animatedValue, setAnimatedValue] = useState(0)
  const [bureauData, setBureauData] = useState<BureauData[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent) => {
    let client: Client
    event.preventDefault()
    try {
      setLoadingData(true)
      setClient(undefined)
      setIsError(false)
      console.log('Simulating Credit for', { skId, amountCredit })

      client = await clientService.getClient(skId)
      setClient(client)

      const score = client.PREDICTION_SCORE
      setCreditScore(score)

      console.log('Simulating Client', { client })
      console.log('SCore Client', { score })

      showSnackBar('Client profile loaded successfully.', 'success')
    } catch (error) {
      let msg
      if (
        error instanceof AxiosError &&
        error.response &&
        typeof error.response.data.detail == 'string'
      )
        msg = error.response.data.detail
      else if (error instanceof Error) msg = error.message
      else msg = String(error)
      showSnackBar(msg, 'error')
      setIsError(true)
    } finally {
      setLoadingData(false)
    }
  }

  // fonctions de traitement pour le rendu

  const getUserAge = (age: number): number => {
    let ageYear = Math.abs(age) / 365.25 // Convert days to years
    return Math.floor(ageYear)
  }

  const getGaugeColor = (value: number) => {
    if (value < 50) {
      return '#f44336' // Red for high risk (0-49)
    } else if (value < 80) {
      return '#ffeb3b' // Yellow for medium risk (50-79)
    } else {
      return '#52b202' // Green for low risk (80-100)
    }
  }

  //
  const translateGenderToFrench = (gender?: number): string => {
    switch (gender) {
      case 0:
        return 'Femme' // 0 represents Female
      case 1:
        return 'Homme' // 1 represents Male
      default:
        return 'Inconnu' // Handle unexpected values
    }
  }

  const translateDaysEmployedToFrench = (daysEmployed: number): string => {
    if (daysEmployed === 365243) {
      return 'Non employé ou retraité' // Handle the special case
    }

    const yearsEmployed = Math.floor(Math.abs(daysEmployed) / 365.25) // Convert days to years and round down
    return `Employé depuis ${yearsEmployed} ans` // Return the number of years employed
  }

  const getGaugeExplanation = (value: number) => {
    if (value < 50) {
      return {
        text: 'Risque élevé : La probabilité de rembourser le prêt est faible. Prudence conseillée.',
        icon: <ErrorIcon style={{ color: '#f44336', marginRight: 8 }} />, // Icône rouge pour risque élevé
        color: '#f44336', // Rouge pour le texte
        detailedText:
          "Le score est inférieur à 50%, ce qui signifie que le client a un risque élevé de ne pas rembourser le prêt. Cela peut être dû à divers facteurs, tels qu'un faible revenu, un historique de crédit médiocre, ou une instabilité de l'emploi.",
      }
    } else if (value < 80) {
      return {
        text: 'Risque modéré : La probabilité de rembourser le prêt est moyenne. Une évaluation supplémentaire est recommandée.',
        icon: <WarningIcon style={{ color: '#ffeb3b', marginRight: 8 }} />, // Icône jaune pour risque modéré
        color: '#ffeb3b', // Jaune pour le texte
        detailedText:
          "Le score est compris entre 50% et 79%, indiquant un risque modéré. Le client a une probabilité moyenne de remboursement, et il serait judicieux d'examiner d'autres facteurs comme la stabilité de l'emploi et l'historique de crédit.",
      }
    } else {
      return {
        text: 'Faible risque : La probabilité de rembourser le prêt est élevée. Le client est susceptible de rembourser.',
        icon: <CheckCircleIcon style={{ color: '#52b202', marginRight: 8 }} />, // Icône verte pour faible risque
        color: '#52b202', // Vert pour le texte
        detailedText:
          'Un score de 80% ou plus indique un faible risque. Le client a une haute probabilité de rembourser le prêt. Les banques considèrent ces clients comme étant fiables, avec un historique de crédit positif et une stabilité financière.',
      }
    }
  }

  function formatNumberWithSpaces(number: number) {
    return new Intl.NumberFormat('fr-FR').format(number)
  }

  const settings = {
    width: 200,
    height: 200,
    value: Math.floor(animatedValue),
  }

  const getSimulationResultFeatureImportance = (featuresImportance?: string) => {
    if (featuresImportance) {
      return featuresImportance.split(',')
    }
  }

  //lecture csv

  useEffect(() => {
    // Charger le fichier CSV depuis le dossier public
    if (loadingData && bureauData.length < 1) {
      fetch('/bureau.csv')
        .then((response: Response) => response.text())
        .then((csvText: string) => {
          Papa.parse<BureauData>(csvText, {
            header: true,
            complete: (result: Papa.ParseResult<BureauData>) => {
              const cleanedData: BureauData[] = result.data.map((row) => ({
                SK_ID_CURR: row['SK_ID_CURR'],
                CREDIT_ACTIVE: row['CREDIT_ACTIVE'],
                DAYS_CREDIT:
                  typeof row['DAYS_CREDIT'] === 'string'
                    ? parseInt(row['DAYS_CREDIT'], 10)
                    : row['DAYS_CREDIT'],
                DAYS_CREDIT_ENDDATE:
                  typeof row['DAYS_CREDIT_ENDDATE'] === 'string'
                    ? parseInt(row['DAYS_CREDIT_ENDDATE'], 10)
                    : row['DAYS_CREDIT_ENDDATE'],
                AMT_CREDIT_SUM:
                  typeof row['AMT_CREDIT_SUM'] === 'string'
                    ? parseFloat(row['AMT_CREDIT_SUM'])
                    : row['AMT_CREDIT_SUM'],
                AMT_CREDIT_SUM_DEBT:
                  typeof row['AMT_CREDIT_SUM_DEBT'] === 'string'
                    ? parseFloat(row['AMT_CREDIT_SUM_DEBT'])
                    : row['AMT_CREDIT_SUM_DEBT'],
                CREDIT_CURRENCY: row['CREDIT_CURRENCY'],
              }))
              setBureauData(cleanedData)
            },
            error: (error: any) => {
              console.error('Erreur lors du parsing du fichier CSV :', error)
            },
          })
        })
        .catch((error: any) => {
          console.error('Erreur lors du chargement du fichier CSV:', error)
        })
    }
  }, [loadingData])

  const userDataBureau = useMemo(() => {
    let data = bureauData.filter((item) => item.SK_ID_CURR === skId)
    return data
  }, [skId, bureauData])

  const creditStatusCounts = userDataBureau.reduce<Record<string, number>>((acc, credit) => {
    const status = credit.CREDIT_ACTIVE
    if (status) {
      acc[status] = (acc[status] || 0) + 1
    }
    return acc
  }, {}) // Définition du type pour l'accumulateur

  const data = Object.entries(creditStatusCounts).map(([status, count]) => ({
    status,
    count,
  }))

  // Function to animate the gauge value
  useEffect(() => {
    let currentValue = 0 // Start animation from 0
    const animationDuration = 2000 // Animation duration in milliseconds
    const frameRate = 60 // Frame rate for smooth animation
    const targetValue = creditScore ? 100 - creditScore : 0

    const stepTime = animationDuration / frameRate
    const increment = (targetValue - currentValue) / (animationDuration / stepTime) // Calculate increment

    const animate = () => {
      if (currentValue < targetValue) {
        currentValue = Math.min(currentValue + increment, targetValue) // Increment value with each frame
        setAnimatedValue(currentValue) // Update state to trigger re-render
        setTimeout(animate, stepTime) // Schedule next frame
      }
    }

    animate() // Start the animation

    // Cleanup function to stop animation if the component unmounts
    return () => {
      currentValue = targetValue // Ensure animation stops
    }
  }, [creditScore])

  // fonctions de rendu

  const renderSimulationResult = useCallback(() => {
    const feauturesImportanceList = getSimulationResultFeatureImportance(client?.PREDICTION_FEATURE)
    const resultExplanation = creditScore ? getGaugeExplanation(100 - creditScore) : undefined
    return (
      creditScore && (
        <>
          <EuiFlexItem>
            <div>
              <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
                Résultat de l'analyse :
              </Typography>
            </div>
            <EuiFlexGroup
              direction={'row'}
              alignItems='center' // Center alignment on the vertical axis
              justifyContent='center' // Center alignment on the horizontal axis
            >
              <EuiFlexItem grow={false}>
                {/* Adjust size to 'grow={false}' for proper centering */}
                <Typography
                  variant='h5'
                  color='textSecondary'
                  gutterBottom
                  sx={{ mt: 4, textAlign: 'center' }}
                >
                  {creditScore ? (
                    <Gauge
                      {...settings}
                      cornerRadius='50%'
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: getGaugeColor(settings.value),
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                    />
                  ) : (
                    ''
                  )}
                </Typography>
              </EuiFlexItem>

              {/* Spacer between the items */}

              <EuiSpacer size='xxl' />
              <EuiSpacer size='xxl' />
              <EuiSpacer size='xxl' />

              <EuiFlexItem grow={false}>
                {' '}
                {/* Adjust size to 'grow={false}' for proper centering */}
                <Card variant='outlined' sx={{ mx: 'auto' }}>
                  {' '}
                  {/* Center card horizontally */}
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant='body2'>
                      Facteurs les plus impactants :
                    </Typography>
                    <Stack direction='row' spacing={1} flexWrap='wrap'>
                      {' '}
                      {/* Allow chips to wrap onto multiple lines */}
                      {feauturesImportanceList?.map((feature, index) => {
                        return (
                          translateFeatureToFrench(feature) && (
                            <Chip
                              key={index}
                              color='primary'
                              label={translateFeatureToFrench(feature)}
                              size='small'
                              sx={{ mb: 1 }} // Add margin-bottom for spacing between rows
                            />
                          )
                        )
                      })}
                    </Stack>
                  </Box>
                </Card>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            {resultExplanation && (
              <>
                <p>
                  {resultExplanation.icon} {resultExplanation.text}
                  <br />
                </p>
                <p>{resultExplanation.detailedText}</p>
              </>
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <Divider />
          </EuiFlexItem>
        </>
      )
    )
  }, [creditScore, settings])

  console.log(userDataBureau)

  return (
    <div>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h3' gutterBottom sx={{ mt: 4 }}>
            Simulation de solvabilité
          </Typography>
          <Divider />

          <Box sx={{ bgcolor: '#455a64', padding: 2, mt: 4, mb: 4 }}>
            <Typography variant='h6' style={{ color: 'white' }}>
              Simuler un crédit
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display='flex' justifyContent='space-between' mb={2}>
              <TextField
                label='Identifiant utilisateur'
                value={skId}
                onChange={(e) => setSkId(e.target.value)}
                fullWidth
                variant='outlined'
                margin='dense'
                style={{ marginRight: '10px' }}
              />
            </Box>

            <Typography variant='body2' color='textSecondary' style={{ marginBottom: '10px' }}>
              Votre score détermine votre niveau de solvabilité.
            </Typography>

            <Button type='submit' variant='contained' color='primary' disabled={loadingData}>
              Simuler
            </Button>
          </form>
        </Box>
      </Container>
      {isError && (
        <Alert variant='filled' severity='error'>
          L'identifiant de l'utilisateur fourni est introuvable
        </Alert>
      )}
      {loadingData ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
          }}
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color='#4fa94d'
            ariaLabel='ball-triangle-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      ) : (
        client && (
          <EuiFlexGroup direction={'column'}>
            {renderSimulationResult()}
            <EuiFlexItem>
              <EuiFlexGroup direction='row' gutterSize='m'>
                <EuiFlexItem grow={false} style={{ width: '50%' }}>
                  {client && (
                    <EuiPanel style={{ width: '100%' }}>
                      <EuiTitle size='s'>
                        <h2>{'Infos. Personnelles'}</h2>
                      </EuiTitle>
                      <EuiSpacer size='s' />
                      <div>Genre : &nbsp;{translateGenderToFrench(client.CODE_GENDER)}</div>
                      <div>
                        Age : &nbsp;
                        {client && client.DAYS_BIRTH ? getUserAge(client.DAYS_BIRTH) : ''}
                      </div>
                      <div>
                        Emploi : &nbsp;
                        {client && client.DAYS_EMPLOYED
                          ? translateDaysEmployedToFrench(client.DAYS_EMPLOYED)
                          : ''}
                      </div>
                      <div>Enfants : &nbsp;{client?.CNT_CHILDREN}</div>
                      <div>Voiture : &nbsp;{client?.FLAG_OWN_CAR}</div>
                      <div>Immoblier : &nbsp;{client?.FLAG_OWN_REALTY}</div>
                    </EuiPanel>
                  )}
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ width: '50%' }}>
                  {client && (
                    <EuiPanel style={{ width: '100%' }}>
                      <EuiTitle size='s'>
                        <h2>{'Infos. crédit et contrat'}</h2>
                      </EuiTitle>
                      <EuiSpacer size='s' />
                      <div>
                        Montant crédit : &nbsp;
                        {client?.AMT_CREDIT && formatNumberWithSpaces(client?.AMT_CREDIT)}
                      </div>
                      <div>
                        Montant annuité : &nbsp;
                        {client?.AMT_ANNUITY && formatNumberWithSpaces(client?.AMT_ANNUITY)} / an
                      </div>
                      <div>
                        Revenu annuel : &nbsp;
                        {client?.AMT_INCOME_TOTAL &&
                          formatNumberWithSpaces(client?.AMT_INCOME_TOTAL)}
                      </div>
                      <div>
                        Type de crédit : &nbsp;
                        {client?.NAME_CONTRACT_TYPE === 0
                          ? 'Prêt à la consommation'
                          : 'Crédit renouvelable'}
                      </div>
                    </EuiPanel>
                  )}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiFlexGroup direction={'row'} style={{ width: '100%' }}>
                <EuiFlexItem grow={false} style={{ flexBasis: '50%' }}>
                  {client && (
                    <EuiPanel>
                      <EuiTitle size='s'>
                        <h2>{'Indicateurs de solvabilité'}</h2>
                      </EuiTitle>
                      <EuiSpacer size='s' />
                      <div>
                        remboursement prêt : &nbsp;
                        {client?.TARGET === 0 ? (
                          <Chip
                            label='Paiement complet'
                            color='success'
                            icon={<DoneIcon />}
                            variant='outlined'
                          />
                        ) : (
                          <Chip
                            label='Défaut de remboursement'
                            color='error'
                            icon={<ErrorIcon />}
                            variant='outlined'
                          />
                        )}
                      </div>
                      <br />
                      <div>
                        Score de risque externe 2 : &nbsp;{' '}
                        {client?.EXT_SOURCE_2 && (
                          <LinearProgress
                            variant='determinate'
                            value={client?.EXT_SOURCE_2 * 100}
                            color={client?.EXT_SOURCE_2 > 0.5 ? 'success' : 'error'}
                          />
                        )}
                      </div>
                      <br />
                      <div>
                        Score de risque externe 3 : &nbsp;{' '}
                        {client?.EXT_SOURCE_3 && (
                          <LinearProgress
                            variant='determinate'
                            value={client?.EXT_SOURCE_3 * 100}
                            color={client?.EXT_SOURCE_3 > 0.5 ? 'success' : 'error'}
                          />
                        )}
                      </div>
                    </EuiPanel>
                  )}
                </EuiFlexItem>

                <EuiFlexItem grow={false} style={{ flexBasis: '50%' }}>
                  {/* Largeur à 50% */}
                  {client && data && (
                    <EuiPanel>
                      <EuiTitle size='s'>
                        <h2>{'Statut des autres prêts'}</h2>
                      </EuiTitle>
                      <EuiSpacer size='s' />
                      <BarChart
                        xAxis={[{ scaleType: 'band', data: data.map((item) => item.status) }]}
                        series={[{ data: data.map((item) => item.count) }]}
                        width={500}
                        height={300}
                      />
                    </EuiPanel>
                  )}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        )
      )}
    </div>
  )
}
export default HomeForm
