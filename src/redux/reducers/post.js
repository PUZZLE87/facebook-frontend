import {
  CREATE_POST_FIAL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  UPLOAD_POST_IMAGE_FAIL,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  CLEAR_POST_INFO,
} from "../actions/types";

const initialState = {
  isLoading: false,
  postInfo: {
    type: "",
    text: "",
    images: [],
    background: "",
  },
  errorMessage: null,
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST_REQUEST:
    case UPLOAD_POST_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case UPLOAD_POST_IMAGE_SUCCESS:
      return {
        isLoading: false,
        postInfo: {
          ...state.postInfo,
          images: payload.images,
        },
        errorMessage: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        isLoading: false,
        postInfo: {
          ...state.postInfo,
          ...payload.postInfo,
        },
        errorMessage: null,
      };
    case CREATE_POST_FIAL:
    case UPLOAD_POST_IMAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case CLEAR_POST_INFO:
      return initialState;
    default:
      return state;
  }
}

export default postReducer;
