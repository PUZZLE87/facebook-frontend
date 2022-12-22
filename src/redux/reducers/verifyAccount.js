import { VERIFY_FAIL, VERIFY_REQUEST, VERIFY_SUCCESS } from "../actions/types";

const initialState = {
  isLoading: false,
  errorMessage: null,
};

function verifyAccountReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case VERIFY_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
      };
    case VERIFY_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
      };

    default:
      return state;
  }
}

export default verifyAccountReducer;
