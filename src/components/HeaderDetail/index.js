import React from 'react';
import { AppAvatar } from '@components/index';
import { Typography } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import PropTypes from 'prop-types';
import './HeaderDetail.scss';

HeaderDetail.propTypes = {
  onClickIcon: PropTypes.func,
  src: PropTypes.string,
  title: PropTypes.string,
};

HeaderDetail.defaultProps = {
  onClickIcon: () => null,
  src: '',
  title: '',
};

export function HeaderDetail(props) {
  const { onClickIcon, src, title } = props;

  return (
    <div className='header-detail'>
      <div className='header-detail__avatar'>
        <AppAvatar src={src} />
        <div className='header-detail__avatar__icon' onClick={onClickIcon}>
          <CameraAlt color='inherit' />
        </div>
      </div>
      <Typography variant='h5' align='center' gutterBottom={true}>
        {title}
      </Typography>
      <hr />
    </div>
  );
}
