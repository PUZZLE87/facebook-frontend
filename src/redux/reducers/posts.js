import {
  GET_POSTS_FAIL,
  GET_POSTS_CLEAN,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCES,
  ADD_NEW_POST,
} from "../actions/types";

const initialState = {
  isLoading: false,
  posts: [],
  errorMessage: "",
  hasNextPage: false,
  nextPage: 1,
  totalPage: 0,
};

function postsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case GET_POSTS_SUCCES:
      return {
        isLoading: false,
        posts: [...state.posts, ...payload.posts],
        errorMessage: "",
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        totalPage: payload.totalPage,
      };
    case ADD_NEW_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case GET_POSTS_CLEAN:
      return initialState;
    default:
      return state;
  }
}

export default postsReducer;
