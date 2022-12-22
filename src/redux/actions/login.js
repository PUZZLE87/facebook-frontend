import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import axios from "../../axios/axios";

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    });

    const res = await axios.post(
      "/user/auth",
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken: res?.data?.accessToken,
        userInfo: res?.data?.userInfo,
      },
    });
  } catch (error) {
    let errorMsg = "";
    if (!error?.response) {
      errorMsg = "Server not respond";
    } else if (error.response?.status === 400) {
      errorMsg = "Invalid email or password";
    } else if (error.response?.status === 401) {
      errorMsg = "Email or password is incorrect";
    } else {
      errorMsg = "Error in login! Please try again"
    }
    dispatch({ type: LOGIN_FAIL, payload: { errorMsg } });
  }
};

export default login;
