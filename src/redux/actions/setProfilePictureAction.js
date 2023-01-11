import {
  CHNAGE_PROFILE_PICTURE,
  CHANGE_USER_PICTURE,
  CHANGE_PROFILE_PICTURE,
} from "./types";

const setProfilePictureAction =
  (formData, axiosPrivate) => async (dispatch) => {
    try {
      const { data } = await axiosPrivate.post("/post/uploadImages", formData);
      await axiosPrivate.post("/user/updatePicture", {
        url: data?.images[0]?.url,
      });
      dispatch({
        type: CHANGE_USER_PICTURE,
        payload: { picture: data?.images[0]?.url },
      });
      dispatch({
        type: CHANGE_PROFILE_PICTURE,
        payload: { picture: data?.images[0]?.url },
      });
    } catch (error) {
      console.log(error);
    }
  };

export default setProfilePictureAction;
