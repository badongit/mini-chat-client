import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, IconButton } from '@material-ui/core';
import { AppAvatar } from '@components/index';
import './ChatCard.scss';

export const ChatCard = memo((props) => {
  const {
    photoLink,
    isOnline,
    title,
    text,
    userId,
    onClick,
    size,
    time,
    icon: Icon,
    modals,
    displayModals,
    onClickIcon,
    scrollTop,
  } = props;
  const cardRef = useRef();

  /** @type {['bottom' | 'top', (position: 'bottom' | 'top') => any]} */
  const [positionModal, setPositionModal] = useState('bottom');

  useEffect(() => {
    if (modals?.length) {
      const distanceToTop = cardRef.current.offsetTop - scrollTop;
      if (cardRef.current.offsetParent.clientHeight - distanceToTop >= 150) {
        setPositionModal('bottom');
      } else {
        setPositionModal('top');
      }
    }
  }, [modals, scrollTop]);

  return (
    <div
      className={`chat-card ${displayModals ? 'chat-card__selected' : ''}`}
      onClick={onClick}
      ref={cardRef}>
      <div className='chat-card__avatar'>
        <AppAvatar src={photoLink} dot={isOnline} size={size} />
      </div>
      <div className='chat-card__content'>
        <Typography component='span' className='chat-card__content__title'>
          {title}
        </Typography>

        {text && (
          <Box display='flex'>
            <Typography noWrap className='chat-card__content__text'>
              {text}
            </Typography>
            <Typography className='chat-card__content__time'>{time}</Typography>
          </Box>
        )}
      </div>
      {Icon && !!modals.length && (
        <div className='chat-card__button'>
          <IconButton onClick={onClickIcon}>
            <Icon />
          </IconButton>
        </div>
      )}
      {!!modals?.length && displayModals && (
        <div className={`chat-card__modals chat-card__${positionModal}`}>
          {modals.map(function (modal, index) {
            return (
              <div
                className='chat-card__modals__button'
                onClick={() => modal.handleClick(userId)}
                key={index}>
                {modal.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

ChatCard.propTypes = {
  photoLink: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  userId: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['normal', 'small']),
  time: PropTypes.string,
  icon: PropTypes.object,
  modals: PropTypes.array,
  displayModals: PropTypes.bool,
  onClickIcon: PropTypes.func,
};

ChatCard.defaultProps = {
  isOnline: false,
  text: '',
  userId: '',
  onClick: () => null,
  size: 'normal',
  time: '',
  icon: null,
  modals: [],
  displayModals: false,
  onClickIcon: () => null,
};
