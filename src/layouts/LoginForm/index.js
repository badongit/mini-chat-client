import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '@components/index';
import { authLoginAsyncAction, authResetErrorAction } from '@store/auth/auth.action';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Link,
  Hidden,
} from '@material-ui/core';
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
  remember: Yup.boolean(),
});

const ButtonSubmit = styled(Button)({
  marginTop: '10px',
  marginBottom: '15px',
});

export function LoginForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const submitForm = (values) => {
    dispatch(authLoginAsyncAction(values));
  };

  useEffect(() => {
    dispatch(authResetErrorAction());
  }, [dispatch]);

  return (
    <div className='login-form animation-fade-bottom'>
      <Typography variant='h4' align='center'>
        SIGN IN
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
              error={(!!errors?.username || !!auth.error) && !!field.value}
              helperText={errors?.username?.message || auth.error || ''}
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
          name='remember'
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  inputRef={ref}
                  color='primary'
                />
              }
              label='Remember me'
            />
          )}
        />
        <ButtonSubmit
          type='submit'
          variant='contained'
          color='primary'
          disabled={auth.isSubmitting}
          fullWidth>
          {auth.isSubmitting ? <Loading color='white' size={24} /> : 'Sign in'}
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
