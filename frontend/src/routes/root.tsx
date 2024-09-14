import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopMenuBar from '../components/TopMenuBar'
import { ModalProvider } from '../contexts/modal' 

export default function Root() {
  return (
    <ModalProvider>
      <Box sx={{ display: 'flex' }}>
        <TopMenuBar />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            paddingBottom: 5,
          }}
        >
          <Toolbar></Toolbar>
          <Outlet />
        </Box>
      </Box>
    </ModalProvider>
  )
}
