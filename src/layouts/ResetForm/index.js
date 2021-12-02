import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '@components/index';
import {
  authResetPasswordAsyncAction,
  authResetErrorAction,
  authResetMessageAction,
} from '@store/auth/auth.action';
import { TextField, Button, Typography, Grid, Link, Hidden } from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('')
    .min(8, 'Minimum of 8 characters')
    .max(20, 'Maximum of 20 characters'),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

const ButtonSubmit = styled(Button)({
  marginTop: '10px',
  marginBottom: '15px',
});

export function ResetForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { resetToken } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });

  const submitForm = (values) => {
    dispatch(authResetPasswordAsyncAction(resetToken, values));
  };

  useEffect(() => {
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
  }, [dispatch]);

  return (
    <div className='reset-form animation-fade-bottom'>
      <Typography variant='h4' align='center'>
        RESET PASSWORD
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
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
              error={(!!errors?.password || !!auth.error) && !!field.value}
              helperText={errors?.password?.message || auth.error || ''}
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
          {auth.isSubmitting ? <Loading color='white' size={24} /> : 'Save'}
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
