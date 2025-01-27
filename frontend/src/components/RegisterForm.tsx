import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Collapse } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm, SubmitHandler } from 'react-hook-form'
import authService from '../services/auth.service'
import { useSnackBar } from '../contexts/snackbar'
import { User } from '../models/user'
import { AxiosError } from 'axios'

const SHOW_EMAIL_REGISTER_FORM: string = import.meta.env.VITE_PWD_SIGNUP_ENABLED

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const navigate = useNavigate()
  const { showSnackBar } = useSnackBar()

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await authService.register(data)
      showSnackBar('Registration successful.', 'success')
      navigate('/login')
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
          Sign Up
        </Typography>

        {SHOW_EMAIL_REGISTER_FORM && SHOW_EMAIL_REGISTER_FORM.toLowerCase() === 'true' && (
          <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  {...register('first_name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Last Name'
                  autoComplete='family-name'
                  {...register('last_name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  autoComplete='email'
                  error={!!errors.email}
                  helperText={errors.email && 'Please provide an email address.'}
                  {...register('email', { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  error={!!errors.password}
                  helperText={errors.password && 'Please provide a password.'}
                  {...register('password', { required: true })}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  )
}
