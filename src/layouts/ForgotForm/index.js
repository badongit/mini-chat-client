import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '@components/index';
import {
  authForgotPasswordAsyncAction,
  authResetErrorAction,
  authResetMessageAction,
} from '@store/auth/auth.action';
import { TextField, Button, Typography, Grid, Link, Hidden } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('').email('Enter an email'),
});

const ButtonSubmit = styled(Button)({
  marginTop: '10px',
  marginBottom: '15px',
});

export function ForgotForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });

  const submitForm = (values) => {
    dispatch(authForgotPasswordAsyncAction(values));
  };

  useEffect(() => {
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
  }, [dispatch]);

  return (
    <div className='forgot-form animation-fade-bottom'>
      <Typography variant='h4' align='center'>
        FORGOT PASSWORD
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <TextField
              {...field}
              required
              autoFocus
              label='Email'
              fullWidth
              margin='normal'
              error={(!!errors?.email || !!auth.error) && !!field.value}
              helperText={errors?.email?.message || auth.error || ''}
            />
          )}
        />
        <ButtonSubmit
          type='submit'
          variant='contained'
          color='primary'
          disabled={auth.isSubmitting}
          fullWidth>
          {auth.isSubmitting ? <Loading color='white' size={24} /> : 'Send'}
        </ButtonSubmit>
      </form>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Link component={RouterLink} to='/login'>
            <Hidden xsDown>
              <Typography variant='body1' align='left' gutterBottom>
                Have an account ?
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant='body1' align='center' gutterBottom>
                Have an account ?
              </Typography>
            </Hidden>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link component={RouterLink} to='/sign-up'>
            <Hidden xsDown>
              <Typography variant='body1' align='right'>
                Don't have an account ?
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant='body1' align='center'>
                Don't have an account ?
              </Typography>
            </Hidden>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
