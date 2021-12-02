import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '@components/index';
import { authRegisterAsyncAction, authResetErrorAction } from '@store/auth/auth.action';
import { TextField, Button, Typography, Grid, Link, Hidden } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('')
    .min(8, 'Minimum of 8 characters')
    .max(20, 'Maximum of 20 characters'),
  password: Yup.string()
    .required('')
    .min(8, 'Minimum of 8 characters')
    .max(20, 'Maximum of 20 characters'),
  email: Yup.string().email('Enter an email').required(),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

const ButtonSubmit = styled(Button)({
  marginTop: '10px',
  marginBottom: '15px',
});

export function RegisterForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
      confirm: '',
      email: '',
    },
  });

  const submitForm = (values) => {
    dispatch(authRegisterAsyncAction(values));
  };

  useEffect(() => {
    dispatch(authResetErrorAction());
  }, [dispatch]);

  useEffect(() => {
    if (auth.error) {
      setError(auth.error.split(' ')[0], {
        type: 'manual',
        message: auth.error,
      });
    }
  }, [auth.error, setError]);

  return (
    <div className='register-form animation-fade-bottom'>
      <Typography variant='h4' align='center'>
        SIGN UP
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name='username'
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoFocus
              autoComplete='username'
              label='Username'
              fullWidth
              margin='normal'
              error={!!errors?.username && !!field.value}
              helperText={errors?.username?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete='email'
              label='Email'
              fullWidth
              margin='normal'
              error={!!errors?.email && !!field.value}
              helperText={errors?.email?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete='password'
              type='password'
              label='Password'
              fullWidth
              margin='normal'
              error={!!errors?.password && !!field.value}
              helperText={errors?.password?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name='confirm'
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoComplete='confirm'
              type='password'
              label='Confirm password'
              fullWidth
              margin='normal'
              error={!!errors?.confirm && !!field.value}
              helperText={errors?.confirm?.message || ''}
            />
          )}
        />

        <ButtonSubmit
          type='submit'
          variant='contained'
          color='primary'
          disabled={auth.isSubmitting}
          fullWidth>
          {auth.isSubmitting ? <Loading color='white' size={24} /> : 'Sign up'}
        </ButtonSubmit>
      </form>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Link component={RouterLink} to='/forgot-password'>
            <Hidden xsDown>
              <Typography variant='body1' align='left' gutterBottom>
                Forgot password ?
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant='body1' align='center' gutterBottom>
                Forgot password ?
              </Typography>
            </Hidden>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link component={RouterLink} to='/login'>
            <Hidden xsDown>
              <Typography variant='body1' align='right'>
                Have an account ?
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant='body1' align='center'>
                Have an account ?
              </Typography>
            </Hidden>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
