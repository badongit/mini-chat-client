import AuthActionEnum from './auth.action';

const initialState = {
  isLoading: true,
  isSubmitting: false,
  isAuthenticated: false,
  message: {
    type: '',
    text: '',
  },
  error: '',
  data: {
    user: {},
  },
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionEnum.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionEnum.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case AuthActionEnum.SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };

    case AuthActionEnum.STOP_SUBMITTING:
      return {
        ...state,
        isSubmitting: false,
      };
    case AuthActionEnum.AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };

    case AuthActionEnum.NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };

    case AuthActionEnum.FAILED:
      return {
        ...state,
        error: payload.error,
      };

    case AuthActionEnum.RESET_ERROR:
      return {
        ...state,
        error: '',
      };

    case AuthActionEnum.SET_MESSAGE: {
      return {
        ...state,
        message: payload.message,
      };
    }

    case AuthActionEnum.RESET_MESSAGE:
      return {
        ...state,
        message: {
          type: '',
          text: '',
        },
      };

    case AuthActionEnum.SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
      };

    case AuthActionEnum.LOG_OUT:
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
};

export default authReducer;
