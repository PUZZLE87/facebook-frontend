import { combineReducers } from "redux";
import loginReducer from "./loign";
import registerReducer from "./register";


export default combineReducers({
  user: loginReducer,
  register: registerReducer,
})
