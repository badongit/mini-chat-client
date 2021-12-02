import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import logo from '../../assets/icon/messenger.ico';
import './Welcome.scss';

Welcome.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Welcome.defaultProps = {
  width: '100%',
  height: '100%',
};

export function Welcome(props) {
  const { width, height } = props;
  return (
    <Box sx={{ width, height }} className='welcome'>
      <div className='welcome__logo'>
        <img src={logo} alt='Logo Mini chat' />
      </div>
      <Typography variant='h5' align='center'>
        Welcome to Mini Chat. Let's start a conversation now.
      </Typography>
    </Box>
  );
}
