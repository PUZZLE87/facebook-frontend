import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from "./types";

const logoutAction = (axiosPrivate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    await axiosPrivate.get("/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response?.data) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = "Logout failed";
    }
    dispatch({ type: LOGOUT_FAIL, errorMessage });
  }
};

export default logoutAction;
