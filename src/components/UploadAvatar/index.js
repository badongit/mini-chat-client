import React, { useState } from 'react';
import { Typography, IconButton, Button } from '@material-ui/core';
import { Close, CameraAlt } from '@material-ui/icons';
import { Loading } from '@components/index';
import PropTypes from 'prop-types';
import './UploadAvatar.scss';

UploadAvatar.propTypes = {
  setHideModal: PropTypes.func,
  hide: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};

UploadAvatar.defaultProps = {
  setHideModal: () => null,
  hide: false,
  isSubmitting: false,
  onSubmit: () => null,
  type: '',
};

export function UploadAvatar(props) {
  const { hide, setHideModal, isSubmitting, onSubmit, type } = props;
  const [fileUpload, setFileUpload] = useState(null);

  const onChange = (event) => {
    setFileUpload(event.target.files[0]);
  };

  const onUploadFile = () => {
    if (!fileUpload) {
      return;
    }

    const formUpload = new FormData();
    formUpload.append(type, fileUpload);

    onSubmit(formUpload);
  };

  return (
    <div className={`upload-avatar ${hide ? 'hide' : ''}`}>
      <div className='upload-avatar__background' onClick={() => setHideModal(true)}></div>
      <div className='upload-avatar__modal'>
        <div className='upload-avatar__modal__header'>
          <Typography variant='h6' align='center'>
            UPDATE AVATAR
          </Typography>
          <div className='upload-avatar__modal__header__close'>
            <IconButton onClick={() => setHideModal(true)}>
              <Close />
            </IconButton>
          </div>
        </div>
        <hr />
        <div className='upload-avatar__modal__preview'>
          <img
            id='upload-avatar__preview__img'
            alt=''
            src={fileUpload && URL.createObjectURL(fileUpload)}
          />
        </div>

        <div className='upload-avatar__modal__button'>
          <input
            accept='image/*'
            className='input-upload'
            id='input-upload'
            type='file'
            onChange={onChange}
          />
          <label htmlFor='input-upload'>
            <Button
              variant='contained'
              component='span'
              color='primary'
              startIcon={<CameraAlt />}
              disabled={isSubmitting}>
              UPLOAD
            </Button>
          </label>
          <Button
            variant='contained'
            color='primary'
            disabled={!fileUpload || isSubmitting}
            onClick={onUploadFile}>
            {isSubmitting ? <Loading size={24} color='white' /> : 'SAVE'}
          </Button>
        </div>
      </div>
    </div>
  );
}
