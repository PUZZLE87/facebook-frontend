import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_ACCESSTOKEN,
  VERIFY_ACCOUNT,
} from "../actions/types";

const initialState = {
  accessToken: "",
  userInfo: null,
  isLoading: false,
  erroMessage: null,
};

function loginReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        accessToken: payload.accessToken,
        userInfo: payload.userInfo,
        isLoading: false,
        errorMessage: null,
      };

    case LOGIN_FAIL:
      return {
        userInfo: null,
        accessToken: "",
        isLoading: false,
        errorMessage: payload.errorMsg,
      };
    case REFRESH_ACCESSTOKEN:
      return {
        ...state,
        userInfo: payload.userInfo,
        accessToken: payload.accessToken,
      };
    case VERIFY_ACCOUNT:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          verified: payload.verified,
        },
      };
    default:
      return state;
  }
}

export default loginReducer;
