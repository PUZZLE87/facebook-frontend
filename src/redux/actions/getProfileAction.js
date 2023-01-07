import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from "./types";

const getProfileAction =
  (username, axiosPrivate, abortSignal) => async (dispatch) => {
    try {
      dispatch({ type: GET_PROFILE_REQUEST });
      const { data } = await axiosPrivate.get(`/user/getprofile/${username}`, {
        signal: abortSignal,
      });
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { profileInfo: data } });
    } catch (error) {
      if (abortSignal.borted) return;
      let errorMessage = "";
      if (!error?.response?.data) {
        errorMessage = "server not respond";
      } else {
        errorMessage = error.response?.data?.message;
      }
      dispatch({ type: GET_PROFILE_FAIL, payload: { errorMessage } });
    }
  };

export default getProfileAction;
