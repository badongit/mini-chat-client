import React from 'react';
import PropTypes from 'prop-types';
import { AppAvatar } from '@components/index';
import './UserCard.scss';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

UserCard.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

UserCard.defaultProps = {
  link: '',
  name: '',
  onClose: () => null,
};

export function UserCard(props) {
  const { link, name, onClose } = props;

  return (
    <div className='user-card'>
      <AppAvatar size='vsmall' src={link} />
      <div className='user-card__name'>
        <Tooltip title={name} aria-label={name}>
          <Typography noWrap>{name}</Typography>
        </Tooltip>
      </div>
      <IconButton onClick={onClose} size='small'>
        <Close fontSize='small' />
      </IconButton>
    </div>
  );
}
