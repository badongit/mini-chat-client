import React from 'react';
import icon from '../../assets/icon/messenger.ico';
import { Typography } from '@material-ui/core';
import './AuthHeader.scss';

export function AuthHeader() {
  return (
    <div className='auth-header'>
      <div className='icon'>
        <img src={icon} alt='logo mini chat app'></img>
      </div>
      <Typography variant='h1' align='center'>
        MINI CHAT
      </Typography>
    </div>
  );
}
