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
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import clientService from '../services/client.service'
import { Client } from '../models/client'
import { useSnackBar } from '../contexts/snackbar'
import { AxiosError } from 'axios'

const HomeForm = () => {
  // State for Credit Simulation Form
  const [client, setClient] = useState()
  const [skId, setSkId] = useState('')
  const [amountCredit, setAmountCredit] = useState('')
  const [creditScore, setCreditScore] = useState(undefined)
  const { showSnackBar } = useSnackBar()

  const handleSubmit = async (event: React.FormEvent) => {
    let client: Client
    event.preventDefault()
    try {
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
    }
  }

  return (
    <div>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h3' gutterBottom sx={{ mt: 4 }}>
            Simulation de solvabilité
          </Typography>
          <Divider />

          <Box sx={{ bgcolor: 'orange', padding: 2, mt: 4 }}>
            <Typography variant='h6' style={{ color: 'white' }}>
              Simuler un crédit
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display='flex' justifyContent='space-between' mb={2}>
              <TextField
                label='SK_ID_CURR'
                value={skId}
                onChange={(e) => setSkId(e.target.value)}
                fullWidth
                variant='outlined'
                margin='dense'
                style={{ marginRight: '10px' }}
              />
              <TextField
                label='Amount credit'
                value={amountCredit}
                onChange={(e) => setAmountCredit(e.target.value)}
                fullWidth
                variant='outlined'
                margin='dense'
              />
            </Box>

            <Typography variant='body2' color='textSecondary' style={{ marginBottom: '10px' }}>
              Votre score détermine votre niveau de solvabilité.
            </Typography>

            <Button type='submit' variant='contained' color='primary'>
              Simuler
            </Button>
          </form>
        </Box>
      </Container>
      <EuiFlexGroup direction={'column'}>
        <EuiFlexItem>
          <EuiFlexGroup direction={'row'} alignItems='center'>
            <EuiFlexItem grow={false}>
              <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
                Résultat de l'analyse :
              </Typography>
            </EuiFlexItem>
            <EuiFlexItem size='l'>
              <Typography variant='h5' color='textSecondary' gutterBottom sx={{ mt: 4 }}>
                {creditScore
                  ? `il y a ${creditScore} % de chances que le client soit en défaut de paiement.`
                  : "Veuillez entrez l'ID du client"}
              </Typography>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus
            suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium
            cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.
          </p>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiFlexGroup direction={'row'}>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiTitle size='s'>
                  <h2>{'Bloc 1'}</h2>
                </EuiTitle>
                <EuiSpacer size='s' />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                  necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam
                  corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae
                  eligendi. Asperiores.
                </p>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiTitle size='s'>
                  <h2>{'Bloc 3'}</h2>
                </EuiTitle>
                <EuiSpacer size='s' />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                  necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam
                  corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae
                  eligendi. Asperiores.
                </p>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiFlexGroup direction={'row'}></EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction={'row'}>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiTitle size='s'>
                  <h2>{'Bloc 4'}</h2>
                </EuiTitle>
                <EuiSpacer size='s' />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                  necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam
                  corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae
                  eligendi. Asperiores.
                </p>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiTitle size='s'>
                  <h2>{'Bloc 5'}</h2>
                </EuiTitle>
                <EuiSpacer size='s' />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                  necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam
                  corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae
                  eligendi. Asperiores.
                </p>
              </EuiPanel>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiTitle size='s'>
                  <h2>{'Bloc 6'}</h2>
                </EuiTitle>
                <EuiSpacer size='s' />
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                  necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam
                  corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae
                  eligendi. Asperiores.
                </p>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}
export default HomeForm
