import { ProfileForm, ChangePasswordForm } from '@layouts/index';
import { UploadAvatar, NavigateBar, HeaderDetail } from '@components/index';
import React, { useState } from 'react';
import { Person, Lock, KeyboardBackspace } from '@material-ui/icons';
import './Profile.scss';
import { IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { authUploadAvatarAsyncAction } from '@store/auth/auth.action';

export function Profile() {
  const [hideModal, setHideModal] = useState(true);
  const {
    data: { user },
    isSubmitting,
  } = useSelector((state) => state.auth, shallowEqual);
  const [form, setForm] = useState('profile');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttons = [
    {
      icon: Person,
      key: 'profile',
      handleClick: () => setForm('profile'),
      text: 'PROFILE',
    },
    {
      icon: Lock,
      key: 'password',
      handleClick: () => setForm('password'),
      text: 'PASSWORD',
    },
  ];

  const backHomePage = () => {
    navigate('/messages');
  };

  const onSubmitUploadFile = (formUpload) => {
    dispatch(authUploadAvatarAsyncAction(formUpload));
  };

  return (
    <div className='profile'>
      <UploadAvatar
        setHideModal={setHideModal}
        hide={hideModal}
        isSubmitting={isSubmitting}
        onSubmit={onSubmitUploadFile}
        type='avatar'
      />
      <IconButton className='profile__back' onClick={backHomePage}>
        <KeyboardBackspace fontSize='large' color='primary' />
      </IconButton>
      <div className='profile__main'>
        <HeaderDetail
          src={user.avatarLink}
          title={user.displayname}
          onClickIcon={() => setHideModal(false)}
        />
        <NavigateBar layout={form} buttons={buttons} />
        <div className={`profile__main__form ${`selected__${form}`}`}>
          <div className='profile__main__form__profile'>
            <ProfileForm />
          </div>
          <div className='profile__main__form__password'>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
