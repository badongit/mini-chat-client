import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import './SendMessage.scss';
import { CancelRounded, Send } from '@material-ui/icons';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

SendMessage.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required(),
});

export function SendMessage(props) {
  const { handleSendMessage } = props;
  const defaultValues = {
    text: '',
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const submitForm = (values) => {
    handleSendMessage(values);
    reset(defaultValues);
  };

  const _renderStartAdornment = (text, name) => {
    return text ? (
      <InputAdornment position='end'>
        <IconButton onClick={() => setValue(name, '')}>
          <CancelRounded color='primary' />
        </IconButton>
      </InputAdornment>
    ) : (
      ''
    );
  };

  return (
    <div className='send-message'>
      <form onSubmit={handleSubmit(submitForm)} className='send-message__form' autoComplete='off'>
        <Controller
          control={control}
          name='text'
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              fullWidth
              error={!!errors.text && !!field.value}
              helperText={!field.value ? '' : errors.text?.message || ''}
              InputProps={{
                endAdornment: _renderStartAdornment(field.value, 'text'),
              }}
            />
          )}
        />
        <IconButton type='submit'>
          <Send color='primary' fontSize='large' />
        </IconButton>
      </form>
    </div>
  );
}
