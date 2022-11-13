import { combineReducers } from "redux";
import loginReducer from "./loign";
import registerReducer from "./register";
import accessTokenReducer from "./accessToken";
import verifyAccountReducer from "./verifyAccount";
import resetPasswordReducer from "./resetPassword";

export default combineReducers({
  user: loginReducer,
  register: registerReducer,
  newAccessToken: accessTokenReducer,
  verifyAccount: verifyAccountReducer,
  resetPassword: resetPasswordReducer,
});
