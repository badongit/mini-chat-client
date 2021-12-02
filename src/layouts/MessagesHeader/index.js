import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Hidden, IconButton, Typography } from '@material-ui/core';
import { Error, KeyboardBackspace } from '@material-ui/icons';
import { AppAvatar } from '@components/index';
import './MessagesHeader.scss';

export const MessagesHeader = memo((props) => {
  const { link, name, type, toggleHideDetail, onClickBack } = props;

  return (
    <div className='messages-header'>
      <div className='messages-header__left'>
        <Hidden smUp>
          <IconButton onClick={onClickBack}>
            <KeyboardBackspace color='primary' />
          </IconButton>
        </Hidden>
        <AppAvatar src={link} size='small' />
        <div className='messages-header__left__name'>
          <Typography className='messages-header__left__name__text' noWrap>
            {name}
          </Typography>
        </div>
      </div>
      {type === 'group' && (
        <IconButton onClick={toggleHideDetail}>
          <Error color='primary' />
        </IconButton>
      )}
    </div>
  );
});

MessagesHeader.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['group', 'private']),
  toggleHideDetail: PropTypes.func,
};

MessagesHeader.defaultProps = {
  type: 'private',
  toggleHideDetail: () => null,
};
