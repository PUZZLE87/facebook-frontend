import {
  VERIFY_ACCOUNT,
  VERIFY_FAIL,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from "./types";

const verifyAction = (token, axiosPrivate) => async (dispatch) => {
  try {
    const controller = new AbortController();
    dispatch({ type: VERIFY_REQUEST });
    console.log("1");
    await axiosPrivate.post("/user/activate", JSON.stringify({ token }), {
      signal: controller.signal,
    });

    console.log("2");
    dispatch({ type: VERIFY_ACCOUNT, payload: { verified: true } });
    dispatch({ type: VERIFY_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = "Invalid token";
    }
    if (error?.code !== "ERR_CANCELED") {
      dispatch({ type: VERIFY_FAIL, payload: { errorMessage } });
    }
  }
};

export default verifyAction;
