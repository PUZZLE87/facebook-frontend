import {
  RESET_SEARCH_REQUSET,
  RESET_SEARCH_SUCCESS,
  RESET_SEARCH_FAIL,
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_EMAIL_FAIL,
  RESET_CODE_REQUEST,
  RESET_CODE_SUCCESS,
  RESET_CODE_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_CANCEL,
} from "../actions/types";

const initialState = {
  isLoading: false,
  email: "",
  picture: "",
  code: "",
  mailSuccess: false,
  errorMessage: null,
};

function resetPasswordReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_SEARCH_REQUSET:
    case RESET_EMAIL_REQUEST:
    case RESET_CODE_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        picture: payload.picture,
        email: payload.email,
        errorMessage: null,
      };
    case RESET_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailSuccess: true,
        errorMessage: null,
      };
    case RESET_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        code: payload?.code,
      };
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_CANCEL:
      return initialState;
    case RESET_SEARCH_FAIL:
    case RESET_EMAIL_FAIL:
    case RESET_CODE_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
}
export default resetPasswordReducer;
