import { combineReducers } from "redux";
import loginReducer from "./loign";
import registerReducer from "./register";
import accessTokenReducer from "./accessToken";


export default combineReducers({
  user: loginReducer,
  register: registerReducer,
  newAccessToken: accessTokenReducer,
})
