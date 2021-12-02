import React, { useCallback, useRef } from 'react';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import avatarDefault from '@assets/images/avatar_default.jpg';
import './AppAvatar.scss';

AppAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  dot: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'normal', 'small', 'vsmall']),
};

AppAvatar.defaultProps = {
  dot: false,
  size: 'large',
};

export function AppAvatar(props) {
  const { src, size, dot } = props;
  const observer = useRef();
  const imageRef = useCallback(
    (node) => {
      if (node) {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            entries[0].target.src = src;
          }
        });

        if (node) observer.current.observe(node);
      }
    },
    [src],
  );

  return (
    <Avatar
      imgProps={{ ref: imageRef }}
      alt='avatar'
      src={avatarDefault}
      className={`app-avatar ${size} ${dot ? 'online' : ''}`}
    />
  );
}
