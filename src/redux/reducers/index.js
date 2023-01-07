import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import accessTokenReducer from "./accessToken";
import verifyAccountReducer from "./verifyAccount";
import resetPasswordReducer from "./resetPassword";
import postReducer from "./post";
import postsReducer from "./posts";
import getProfileReducer from "./getProfile";
import setCoverReducer from "./setCover";

export default combineReducers({
  user: loginReducer,
  register: registerReducer,
  newAccessToken: accessTokenReducer,
  verifyAccount: verifyAccountReducer,
  resetPassword: resetPasswordReducer,
  post: postReducer,
  posts: postsReducer,
  profile: getProfileReducer,
  cover: setCoverReducer,
});
