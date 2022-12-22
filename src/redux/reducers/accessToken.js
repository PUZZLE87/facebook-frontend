import {
  ACCESSTOKEN_REQUEST,
  ACCEESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
} from "../actions/types";

const initialState = {
  isLoading: false,
  errorMessage: null,
};

function accessTokenReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACCESSTOKEN_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case ACCEESSTOKEN_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
      };
    case ACCESSTOKEN_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
}

export default accessTokenReducer; 
