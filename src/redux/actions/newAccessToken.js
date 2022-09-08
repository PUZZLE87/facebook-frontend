import {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
  REFRESH_ACCESSTOKEN,
} from "./types";

import axios from "../../axios/axios";

const newAccessTokenAction = () => async (dispatch) => {
  try {
    dispatch({ type: ACCESSTOKEN_REQUEST });

    const response = await axios.get("/user/refresh", {
      withCredentials: true,
    });

    dispatch({
      type: REFRESH_ACCESSTOKEN,
      payload: {
        accessToken: response.data?.accessToken,
        userInfo: response.data?.userInfo,
      },
    });
    dispatch({ type: ACCESSTOKEN_SUCCESS });
  } catch (error) {
    let errorMsg = "";
    if (!error?.response) {
      errorMsg = "Server not respond";
    } else {
      errorMsg = "Invalid refresh token";
    }

    dispatch({ type: ACCESSTOKEN_FAIL, payload: { errorMessage: errorMsg } });
  }
};

export default newAccessTokenAction;
