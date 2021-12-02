import './App.scss';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { authGetProfileAsyncAction, authResetMessageAction } from '@store/auth/auth.action';
import { useCallback, useEffect, useState } from 'react';
import { Loading, Notification } from '@components/index';
import SocketService from '@socket/service';
import SocketContext from '@socket/SocketReactContext';

function App() {
  const element = useRoutes(routes);
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(() => null);
  const [socketService, setSocketService] = useState(() => new SocketService());

  useEffect(() => {
    dispatch(authGetProfileAsyncAction());
  }, [dispatch]);

  const handleResetMessage = useCallback(() => {
    dispatch(authResetMessageAction());
  }, [dispatch]);

  if (isLoading) {
    return <Loading width='100vw' height='100vh' size={50} />;
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        ctxSetSocket: setSocket,
        socketService,
        ctxSetSocketService: setSocketService,
      }}>
      <Notification
        type={message.type}
        text={message.text}
        handleResetMessage={handleResetMessage}
      />
      {element}
    </SocketContext.Provider>
  );
}

export default App;
