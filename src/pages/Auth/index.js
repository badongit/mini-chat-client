import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { AuthHeader } from '@components/index';
import { useSelector } from 'react-redux';

export function Auth(props) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/messages');
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className='auth'>
      <div className='auth__header'>
        <AuthHeader />
      </div>
      <div className='auth__form-outlet'>
        <Outlet />
      </div>
    </div>
  );
}
