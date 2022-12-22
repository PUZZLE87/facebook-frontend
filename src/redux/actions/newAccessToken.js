import {
  ACCEESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
  ACCESSTOKEN_REQUEST,
  REFRESH_ACCESSTOEKN,
} from "./types";
import axios from "../../axios/axios";

const newAccessTokenAction = () => async (dispatch) => {
  try {
    dispatch({ type: ACCESSTOKEN_REQUEST });
    const response = await axios.get("/user/refresh", {
      withCredentials: true,
    });

    dispatch({
      type: REFRESH_ACCESSTOEKN,
      payload: {
        accessToken: response.data?.accessToken,
        userInfo: response.data?.userInfo,
      },
    });
    dispatch({ type: ACCEESSTOKEN_SUCCESS });
  } catch (error) {
    let errorMsg = "";
    if (!error?.response) {
      errorMsg = "Server not respond";
    } else {
      errorMsg = "Invalid refreshtoken";
    }
    dispatch({ type: ACCESSTOKEN_FAIL, payload: { errorMessage: errorMsg } });
  }
};

export default newAccessTokenAction;
