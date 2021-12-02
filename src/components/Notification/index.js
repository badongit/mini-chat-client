import React, { useEffect } from 'react';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import { CheckCircle, Info, Error, Close } from '@material-ui/icons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Notification.scss';

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error', '']),
  text: PropTypes.string.isRequired,
  handleResetMessage: PropTypes.func,
};

Notification.defaultProps = {
  handleResetMessage: () => null,
};

export function Notification(props) {
  const { type, text, handleResetMessage } = props;

  const Icon = type === 'info' ? Info : type === 'success' ? CheckCircle : Error;

  useEffect(() => {
    let timerId;
    if (text) {
      timerId = setTimeout(handleResetMessage, 2500);
    }

    return () => clearTimeout(timerId);
  }, [text, handleResetMessage]);

  const onClose = () => {
    handleResetMessage();
  };

  return (
    <Box className={`notification ${type} ${!text ? 'hide' : ''}`}>
      <Grid container alignItems='center' wrap='nowrap'>
        <Grid item>
          <Box className='notification__type'></Box>
        </Grid>
        <Grid item>
          <Box className='notification__icon'>
            <Icon color='inherit' fontSize='inherit' />
          </Box>
        </Grid>
        <Grid item xs>
          <Box className='notification__text'>
            <Box className='notification__text__wrapper'>
              <Typography variant='h6'>{_.startCase(type)}</Typography>
              <Typography noWrap={true}>{_.startCase(_.toLower(text))}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box className='notification__close'>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
