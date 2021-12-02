import { LoginForm, RegisterForm, ForgotForm, ResetForm } from '@layouts/index';
import { ChatDesktop, Auth, Profile } from '@pages/index';
import { PrivateComponent } from '@components/index';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: 'profile',
    element: (
      <PrivateComponent>
        <Profile />
      </PrivateComponent>
    ),
  },
  {
    path: 'messages',
    element: (
      <PrivateComponent>
        <ChatDesktop />
      </PrivateComponent>
    ),
  },
  {
    path: '/',
    element: <Auth />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'sign-up', element: <RegisterForm /> },
      { path: 'forgot-password', element: <ForgotForm /> },
      { path: 'reset-password/:resetToken', element: <ResetForm /> },
      { path: '/', element: <Navigate to='/login' /> },
    ],
  },
];

export default routes;
