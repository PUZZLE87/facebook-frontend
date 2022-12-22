import {
  CREATE_POST_FIAL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  CLEAR_POST_INFO,
  ADD_NEW_POST,
} from "../actions/types";

export const postAction =
  (axiosPrivte, values, formData = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: CLEAR_POST_INFO });
      if (formData) {
        dispatch({ type: UPLOAD_POST_IMAGE_REQUEST });
        var { data } = await axiosPrivte.post("/post/uploadImages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch({
          type: UPLOAD_POST_IMAGE_SUCCESS,
          payload: { images: data?.images },
        });
      }
      dispatch({ type: CREATE_POST_REQUEST });
      const postData = await axiosPrivte.post("/post/createPost", {
        ...values,
        images: data?.images || [],
      });
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: { postInfo: { ...values, images: data?.images || [] } },
      });
      dispatch({ type: ADD_NEW_POST, payload: { post: postData?.data } });
    } catch (error) {
      let errorMessage = null;
      if (!error?.response?.data) {
        errorMessage = "Server not respond";
      } else {
        errorMessage = error.response?.data?.message;
      }
      dispatch({ type: CREATE_POST_FIAL, payload: { errorMessage } });
    }
  };

export const clearPostAction = () => (dispatch) => {
  dispatch({ type: CLEAR_POST_INFO });
};
