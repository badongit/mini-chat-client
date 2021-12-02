import { Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './ModalConfirm.scss';

export const ModalConfirm = memo((props) => {
  const { hide, handleConfirm, handleClose, text, subject } = props;

  return (
    <div className={`modal-confirm ${hide ? 'hide' : ''}`}>
      <div className='modal-confirm__overlay' onClick={handleClose}></div>
      <div className='modal-confirm__form'>
        <div className='modal-confirm__form__subject'>
          <p>{subject}</p>
          <div className='modal-confirm__form__subject__close'>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
        </div>
        <hr />
        <p className='modal-confirm__form__text'>{text}</p>
        <div className='modal-confirm__form__button'>
          <Button variant='contained' color='primary' onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant='contained' onClick={handleClose}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
});

ModalConfirm.propTypes = {
  hide: PropTypes.bool,
  text: PropTypes.string,
  subject: PropTypes.string,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
};

ModalConfirm.defaultProps = {
  hide: true,
  text: 'Confirm ?',
  subject: 'Confirm ?',
  handleClose: null,
  handleConfirm: null,
};

export default ModalConfirm;
