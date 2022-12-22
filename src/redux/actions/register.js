import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

import axios from "../../axios/axios";

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    await axios.post("/user/register", JSON.stringify({ ...data }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (error) {
    let errorMsg = "";
    if (!error?.response) {
      errorMsg = "Server not respond";
    } else if (error.response?.status === 400) {
      errorMsg = error?.response?.data?.errors[0]?.msg;
    } else {
      errorMsg = "Error in registeration! Plear trye again";
    }

    dispatch({ type: REGISTER_FAIL, payload: { errorMessage: errorMsg } });
  }
};

export default register;
