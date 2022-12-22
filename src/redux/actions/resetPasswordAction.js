import {
  RESET_SEARCH_REQUSET,
  RESET_SEARCH_SUCCESS,
  RESET_SEARCH_FAIL,
  RESET_EMAIL_FAIL,
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_CODE_FAIL,
  RESET_CODE_REQUEST,
  RESET_CODE_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_CANCEL,
  LOGIN_SUCCESS,
} from "./types";
import axios from "../../axios/axios";

const resetPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESET_SEARCH_REQUSET });
    const { data } = await axios.post(
      "/user/findUser",
      JSON.stringify({ email }),
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch({
      type: RESET_SEARCH_SUCCESS,
      payload: { email: data?.email, picture: data?.picture },
    });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response?.data) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error.response?.data?.message;
    }
    dispatch({ type: RESET_SEARCH_FAIL, payload: { errorMessage } });
  }
};

const resetEmailAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESET_EMAIL_REQUEST });
    await axios.post("/user/sendResetPasswordCode", JSON.stringify({ email }), {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: RESET_EMAIL_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response?.data) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error.response?.data?.message;
    }
    dispatch({ type: RESET_EMAIL_FAIL, payload: { errorMessage } });
  }
};

const resetCodeAction = (email, code) => async (dispatch) => {
  try {
    dispatch({ type: RESET_CODE_REQUEST });
    const { data } = await axios.post(
      "/user/validateResetCode",
      JSON.stringify({ email, code }),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: RESET_CODE_SUCCESS, payload: { code: data?.code } });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response?.data) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error.response?.data?.message;
    }
    dispatch({ type: RESET_CODE_FAIL, payload: { errorMessage } });
  }
};

const resetPasswordChangeAction =
  (email, password, code) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      await axios.post(
        "/user/changePassword",
        JSON.stringify({ email, password, code }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS });

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
      let errorMessage = "";
      if (!error?.response?.data) {
        errorMessage = "Server not respond";
      } else {
        errorMessage = error.response?.data?.message;
      }
      dispatch({ type: RESET_PASSWORD_FAIL, payload: { errorMessage } });
    }
  };

const resetPasswordCancelAction = () => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_CANCEL });
};

export {
  resetPasswordAction,
  resetEmailAction,
  resetCodeAction,
  resetPasswordChangeAction,
  resetPasswordCancelAction,
};
