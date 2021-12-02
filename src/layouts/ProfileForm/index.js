import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@material-ui/core';
import { Loading } from '@components/Loading';
import {
  authResetErrorAction,
  authResetMessageAction,
  authUpdateProfileAsyncAction,
} from '@store/auth/auth.action';

const validationSchema = Yup.object().shape({
  displayname: Yup.string()
    .required('Display name is required')
    .min(2, 'Minimum of 2 characters')
    .max(30, 'Maximum of 30 characters'),
  email: Yup.string().email('Enter an Email').required('Email is required'),
});

export function ProfileForm(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      displayname: auth.data.user.displayname,
      email: auth.data.user.email,
    },
  });

  const submitForm = (values) => {
    dispatch(authUpdateProfileAsyncAction(values));
  };

  useEffect(() => {
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
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
    <div className='profile-form'>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name='displayname'
          render={({ field }) => (
            <TextField
              {...field}
              required
              label='Display name'
              fullWidth
              margin='normal'
              error={!!errors.displayname && !!field.value}
              helperText={errors?.displayname?.message || ''}
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
              label='Email'
              fullWidth
              margin='normal'
              error={!!errors.email && !!field.value}
              helperText={errors?.email?.message || ''}
            />
          )}
        />
        <Typography align='right'>
          <Button type='submit' variant='contained' color='primary' disabled={auth.isSubmitting}>
            {auth.isSubmitting ? <Loading color='white' size={24} /> : 'Save'}
          </Button>
        </Typography>
      </form>
    </div>
  );
}
