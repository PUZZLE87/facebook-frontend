import {
  SET_COVER_REQUEST,
  SET_COVER_SUCCESS,
  SET_COVER_FAIL,
  SET_COVER_CLEAR,
  CHANGE_PROFILE_COVER,
} from "./types";

const setCoverAction =
  (formData, axiosPrivate, signal, setCoverPicture) => async (dispatch) => {
    try {
      dispatch({ type: SET_COVER_REQUEST });
      const { data } = await axiosPrivate.post("/post/uploadImages", formData, {
        signal,
      });
      await axiosPrivate.post(
        "/user/updateCover",
        { url: data?.images[0]?.url },
        { signal }
      );

      dispatch({ type: SET_COVER_SUCCESS });
      dispatch({
        type: CHANGE_PROFILE_COVER,
        payload: { cover: data?.images[0]?.url },
      });
      setCoverPicture("");
      dispatch({ type: SET_COVER_CLEAR });
    } catch (error) {
      if (signal.aborted) dispatch({ type: SET_COVER_CLEAR });
      let errorMessage = "";
      if (!error?.response?.data) {
        errorMessage = "Server not respond";
      } else {
        errorMessage = error.response?.data?.message;
      }
      dispatch({ type: SET_COVER_FAIL, payload: { errorMessage } });
    }
  };

export default setCoverAction;
