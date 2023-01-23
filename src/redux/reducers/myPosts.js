import {
  GET_MYPOSTS_FAIL,
  GET_MYPOSTS_CLEAN,
  GET_MYPOSTS_REQUEST,
  GET_MYPOSTS_SUCCESS,
  ADD_NEW_MYPOST,
} from "../actions/types";

const initialState = {
  isLoading: false,
  posts: [],
  errorMessage: "",
  hasNextPage: false,
  nextPage: 1,
  totalPage: 0,
};

function myPostsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MYPOSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case GET_MYPOSTS_SUCCESS:
      return {
        isLoading: false,
        posts: [...state.posts, ...payload.posts],
        errorMessage: "",
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        totalPage: payload.totalPage,
      };
    case ADD_NEW_MYPOST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case GET_MYPOSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case GET_MYPOSTS_CLEAN:
      return initialState;
    default:
      return state;
  }
}

export default myPostsReducer;
