import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isRegistered: false,
  errorMessage: null,
};

function registerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        isLoading: true,
        isRegistered: false,
        errorMessage: null,
      };
    case REGISTER_SUCCESS:
      return {
        isLoading: false,
        isRegistered: true,
        errorMessage: null,
      };
    case REGISTER_FAIL:
      return {
        isLoading: false,
        isRegistered: false,
        errorMessage: payload.errorMessage,
      };

    default:
      return state;
  }
}


export default registerReducer;
