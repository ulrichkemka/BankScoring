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
import { GitHub } from '@mui/icons-material'
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


const HomeForm = () => {

     // State for Credit Simulation Form
  const [skId, setSkId] = useState('')
  const [amountCredit, setAmountCredit] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('Simulating Credit for', { skId, amountCredit })
        // Logic to handle the simulation can be added here.
      }

return (
    <div> 
         <Container >
        <Box sx={{ mb: 4 }}>
          <Typography variant='body1'>
        
            FARMD is a minimalist starter template for a FARM application stack ready to run with
            docker. It offers basic user management, with options for OAuth2 support via Google, so
            that you can get started straight away. It is built with a clean design & minimal
            dependencies in mind, keeping only the essentials.
          </Typography>
          <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
            Features
          </Typography>
          <Divider />

          {/* Credit Simulation Form */}
          <Box sx={{ bgcolor: 'orange', padding: 2, mt: 4 }}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Simuler un crédit
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="SK_ID_CURR"
                value={skId}
                onChange={(e) => setSkId(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                style={{ marginRight: '10px' }}
              />
              <TextField
                label="Amount credit"
                value={amountCredit}
                onChange={(e) => setAmountCredit(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
              Votre score détermine votre niveau de solvabilité.
            </Typography>

            <Button type="submit" variant="contained" color="primary">
              Envoyer
            </Button>
          </form>
        </Box>

      </Container>
      <EuiFlexGroup direction={'column'}>
        <EuiFlexItem>
          <EuiFlexGroup direction={'row'} alignItems='center'>
            <EuiFlexItem grow={false}>
              <EuiTitle size='s'>
                <h2>Espace capteurs</h2>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
        </EuiFlexItem>

        {/* <EuiFlexGroup direction={'row'}> */}
          <EuiFlexItem>
            <EuiFlexGroup direction={'row'}>
              <EuiFlexItem grow={false}>
                <EuiPanel>
                  <EuiTitle size='s'>
                    <h2>{'Bloc 1'}</h2>
                  </EuiTitle>
                  <EuiSpacer size='s' />
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiPanel>
                  <EuiTitle size='s'>
                    <h2>{'Bloc 3'}</h2>
                  </EuiTitle>
                  <EuiSpacer size='s' />
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFlexGroup direction={'row'}>

            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction={'row'}>
            <EuiFlexItem grow={false}>
                <EuiPanel>
                  <EuiTitle size='s'>
                    <h2>{'Bloc 4'}</h2>
                  </EuiTitle>
                  <EuiSpacer size='s' />
                     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiPanel>
                  <EuiTitle size='s'>
                    <h2>{'Bloc 5'}</h2>
                  </EuiTitle>
                  <EuiSpacer size='s' />
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
                </EuiPanel>
              </EuiFlexItem>

              <EuiFlexItem grow={false}>
                <EuiPanel>
                  <EuiTitle size='s'>
                    <h2>{'Bloc 6'}</h2>
                  </EuiTitle>
                  <EuiSpacer size='s' />
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis necessitatibus suscipit alias est omnis sapiente ipsa autem architecto, quam corrupti veniam laudantium cumque ut, soluta eveniet, excepturi molestiae eligendi. Asperiores.</p>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        {/* </EuiFlexGroup> */}
      </EuiFlexGroup>
    </div>
  )
}
  export default HomeForm
