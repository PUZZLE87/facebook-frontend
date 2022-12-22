import axios from "../axios/axios";
import { REFRESH_ACCESSTOEKN } from "../redux/actions/types";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/user/refresh", {
        withCredentials: true,
      });
      dispatch({
        type: REFRESH_ACCESSTOEKN,
        payload: {
          accessToken: data.accessToken,
          userInfo: data.userInfo,
        },
      });
      return data?.accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
