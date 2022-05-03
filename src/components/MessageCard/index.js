import { AppAvatar } from '@components/index';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './MessageCard.scss';

MessageCard.propTypes = {
  type: PropTypes.oneOf(['user', 'me', 'system']).isRequired,
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  time: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.oneOf(['only', 'top', 'middle', 'bottom']),
  id: PropTypes.string,
};

MessageCard.defaultProps = {
  position: 'only',
  link: '',
  time: '',
  name: '',
  id: '',
};

export function MessageCard(props) {
  const { type, link, text, time, name, position, id } = props;
  const positionClass = position ? `message-card__${position}` : '';

  let body;

  if (type === 'system') {
    body = (
      <div className='message-card-system'>
        <Typography align='center' color='inherit'>
          {text}
        </Typography>
      </div>
    );
  } else {
    body = (
      <div className={`${type === 'me' ? 'message-card-me' : ''}`}>
        <div className='message-card'>
          {type === 'user' && (
            <div className='message-card__avatar'>
              {['only', 'bottom'].includes(position) && <AppAvatar src={link} size='vsmall' />}
            </div>
          )}
          <div className={`message-card__contain ${positionClass}`}>
            {['only', 'top'].includes(position) && type === 'user' && (
              <div className='message-card__contain__name'>
                <Typography color='inherit'>{name}</Typography>
              </div>
            )}
            <div className='message-card__contain__text'>
              {text}
              <div className='message-card__contain__text__time'>{time}</div>
              {id === '' ? <div className='message-card__contain__text__not-send'></div> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return body;
}
