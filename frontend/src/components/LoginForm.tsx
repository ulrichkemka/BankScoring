import { useState } from 'react'
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Link,
  Grid,
  SvgIcon,
  SvgIconProps,
  Collapse,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSnackBar } from '../contexts/snackbar'
import { useAuth } from '../contexts/auth'
import authService from '../services/auth.service'
import { User } from '../models/user'
import { AxiosError } from 'axios'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const navigate = useNavigate()
  const { showSnackBar } = useSnackBar()
  const { login } = useAuth()

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('username', data.email)
      formData.append('password', data.password as string)
      await login(formData)
      showSnackBar('Login successful.', 'success')
      navigate('/')
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
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} noValidate>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email address'
          autoComplete='email'
          autoFocus
          error={!!errors.email}
          helperText={errors.email && 'Please provide an email address.'}
          {...register('email', { required: true })}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          error={!!errors.password}
          helperText={errors.password && 'Please provide a password.'}
          {...register('password', { required: true })}
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link component={RouterLink} to='/register' variant='body2'>
              {"Don't have an account yet? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
