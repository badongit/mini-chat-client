import { AppAvatar } from '@components/index';
import { Box, Hidden, IconButton, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp, Group } from '@material-ui/icons';
import { authLogoutAsyncAction } from '@store/auth/auth.action';
import './HomeHeader.scss';
import { useNavigate } from 'react-router';
import SocketContext from '@socket/SocketReactContext';

export function HomeHeader(props) {
  const { setHideCreateGroup } = props;
  const auth = useSelector((state) => state.auth);
  const { ctxSetSocket, socketService } = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateProfilePage = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    socketService.disconnect();
    ctxSetSocket(null);
    dispatch(authLogoutAsyncAction());
  };

  return (
    <div className='home-header'>
      <Box
        alignItems='center'
        display='flex'
        fontSize='2rem'
        onClick={navigateProfilePage}
        className='home-header__navigate'>
        <AppAvatar size='small' src={auth.data.user.avatarLink} />
        <Hidden smDown>
          <Typography className='home-header__navigate__text'>MINI CHAT</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className='home-header__navigate__text'>MINI CHAT</Typography>
        </Hidden>
      </Box>
      <Box>
        <IconButton onClick={() => setHideCreateGroup(false)}>
          <Group color='primary' fontSize='medium' />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <ExitToApp color='primary' fontSize='medium' />
        </IconButton>
      </Box>
    </div>
  );
}
