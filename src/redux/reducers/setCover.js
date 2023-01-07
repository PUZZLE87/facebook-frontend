import {
  SET_COVER_REQUEST,
  SET_COVER_SUCCESS,
  SET_COVER_FAIL,
  SET_COVER_CLEAR,
} from "../actions/types";

const initialState = {
  isLoading: false,
  errorMessage: "",
  success: false,
};

function setCoverReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_COVER_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        success: false,
      };
    case SET_COVER_SUCCESS:
      return {
        isLoading: false,
        success: true,
        errorMessage: "",
      };
    case SET_COVER_FAIL:
      return {
        isLoading: false,
        success: false,
        errorMessage: payload?.errorMessage,
      };
    case SET_COVER_CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export default setCoverReducer;
