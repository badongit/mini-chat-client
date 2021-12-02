import authServices from '@services/auth.services';
import setAuthToken from '@utils/setAuthToken';
import { global } from '@constants/global';

const AuthActionEnum = {
  LOADING: 'auth/LOADING',
  STOP_LOADING: 'auth/STOP_LOADING',
  SUBMITTING: 'auth/SUBMITTING',
  STOP_SUBMITTING: 'auth/STOP_SUBMITTING',
  AUTHENTICATED: 'auth/AUTHENTICATED',
  NOT_AUTHENTICATED: 'auth/NOT_AUTHENTICATED',
  SET_DATA: 'auth/SET_DATA',
  FAILED: 'auth/FAILED',
  RESET_ERROR: 'auth/RESET_ERROR',
  SET_MESSAGE: 'auth/SET_MESSAGE',
  RESET_MESSAGE: 'auth/RESET_MESSAGE',
  LOG_OUT: 'auth/LOG_OUT',
};

export const authLoadingAction = () => ({
  type: AuthActionEnum.LOADING,
});

export const authStopLoadingAction = () => ({
  type: AuthActionEnum.STOP_LOADING,
});

export const authSubmittingAction = () => ({
  type: AuthActionEnum.SUBMITTING,
});

export const authStopSubmittingAction = () => ({
  type: AuthActionEnum.STOP_SUBMITTING,
});
export const authAuthenticatedAction = () => ({
  type: AuthActionEnum.AUTHENTICATED,
});

export const authNotAuthenticatedAction = () => ({
  type: AuthActionEnum.NOT_AUTHENTICATED,
});

export const authSetDataAction = (data) => ({
  type: AuthActionEnum.SET_DATA,
  payload: { data },
});

export const authFailedAction = (error) => ({
  type: AuthActionEnum.FAILED,
  payload: { error },
});

export const authResetErrorAction = () => ({
  type: AuthActionEnum.RESET_ERROR,
});

export const authSetMessageAction = (message) => ({
  type: AuthActionEnum.SET_MESSAGE,
  payload: { message },
});

export const authResetMessageAction = () => ({
  type: AuthActionEnum.RESET_MESSAGE,
});

export const authLogoutAction = () => ({
  type: AuthActionEnum.LOG_OUT,
});

export const authLoginAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetErrorAction());
    const response = await authServices.login(values);

    if (values.remember) {
      localStorage.setItem(global.ACCESS_TOKEN, response.data.accessToken);
      localStorage.setItem(global.REFRESH_TOKEN, response.data.refreshToken);
    } else {
      window.sessionStorage.setItem(global.ACCESS_TOKEN, response.data.accessToken);
      window.sessionStorage.setItem(global.REFRESH_TOKEN, response.data.refreshToken);
    }
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
    const token =
      window.sessionStorage.getItem(global.ACCESS_TOKEN) ||
      localStorage.getItem(global.ACCESS_TOKEN);
    if (token) {
      dispatch(authGetProfileAsyncAction());
    }
  }
};

export const authRegisterAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetErrorAction());
    const response = await authServices.register(values);

    localStorage.setItem(global.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(global.REFRESH_TOKEN, response.data.refreshToken);
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
    const token = localStorage.getItem(global.ACCESS_TOKEN);
    if (token) {
      dispatch(authGetProfileAsyncAction());
    }
  }
};

export const authGetProfileAsyncAction = () => async (dispatch) => {
  try {
    dispatch(authLoadingAction());

    const token =
      window.sessionStorage.getItem(global.ACCESS_TOKEN) ||
      localStorage.getItem(global.ACCESS_TOKEN);
    setAuthToken(token);

    const response = await authServices.getProfile();
    dispatch(authSetDataAction(response.data));
    dispatch(authAuthenticatedAction());
  } catch (error) {
    setAuthToken(null);
    localStorage.removeItem(global.ACCESS_TOKEN);
    window.sessionStorage.removeItem(global.ACCESS_TOKEN);
    dispatch(authNotAuthenticatedAction());
  } finally {
    dispatch(authStopLoadingAction());
  }
};

export const authLogoutAsyncAction = () => async (dispatch) => {
  try {
    dispatch(authLoadingAction());
    dispatch(authResetErrorAction());

    await authServices.logout();
    dispatch(authLogoutAction());
    setAuthToken(null);

    localStorage.removeItem(global.ACCESS_TOKEN);
    localStorage.removeItem(global.REFRESH_TOKEN);
    window.sessionStorage.clear();
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopLoadingAction());
  }
};

export const authForgotPasswordAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
    const response = await authServices.forgotPassword(values);
    dispatch(authSetMessageAction({ type: 'success', text: response.message }));
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
  }
};

export const authResetPasswordAsyncAction = (resetToken, values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
    const response = await authServices.resetPassword(resetToken, values);
    dispatch(authSetMessageAction({ type: 'success', text: response.message }));
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
  }
};

export const authUploadAvatarAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetMessageAction());
    const response = await authServices.uploadAvatar(values);
    dispatch(authSetMessageAction({ type: 'success', text: response.message }));
    dispatch(authSetDataAction(response.data));
  } catch (error) {
    dispatch(authSetMessageAction({ type: 'error', text: error.message }));
  } finally {
    dispatch(authStopSubmittingAction());
  }
};

export const authUpdateProfileAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetErrorAction());
    dispatch(authResetMessageAction());
    const response = await authServices.updateProfile(values);
    dispatch(authSetMessageAction({ type: 'success', text: response.message }));
    dispatch(authSetDataAction(response.data));
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
  }
};

export const authChangePasswordAsyncAction = (values) => async (dispatch) => {
  try {
    dispatch(authSubmittingAction());
    dispatch(authResetMessageAction());
    dispatch(authResetErrorAction());
    const response = await authServices.changePassword(values);
    dispatch(authSetMessageAction({ type: 'success', text: response.message }));
  } catch (error) {
    dispatch(authFailedAction(error.message));
  } finally {
    dispatch(authStopSubmittingAction());
  }
};

export default AuthActionEnum;
