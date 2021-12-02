import { Loading } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  authChangePasswordAsyncAction,
  authResetErrorAction,
  authResetMessageAction,
} from '@store/auth/auth.action';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const validateSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('')
    .min(8, 'Minimum of 8 characters')
    .max(20, 'Maximum of 20 characters'),
  newPassword: Yup.string()
    .required('')
    .min(8, 'Minimum of 8 characters')
    .max(20, 'Maximum of 20 characters'),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Password must match'),
});

export function ChangePasswordForm(props) {
  const auth = useSelector((state) => state.auth);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirm: '',
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authResetMessageAction());
    dispatch(authResetErrorAction());
  }, [dispatch]);

  const submitForm = (values) => {
    dispatch(authChangePasswordAsyncAction(values));
  };

  return (
    <div className='change-password'>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name='oldPassword'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label='Password'
              fullWidth
              margin='normal'
              type='password'
              error={(!!errors.oldPassword || !!auth.error) && !!field.value}
              helperText={errors.oldPassword?.message || auth.error || ''}
            />
          )}
        />
        <Controller
          name='newPassword'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label='New password'
              fullWidth
              margin='normal'
              type='password'
              error={!!errors.newPassword && !!field.value}
              helperText={errors.newPassword?.message || ''}
            />
          )}
        />
        <Controller
          name='confirm'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label='Confirm'
              fullWidth
              margin='normal'
              type='password'
              error={!!errors.confirm && !!field.value}
              helperText={errors.confirm?.message || ''}
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
