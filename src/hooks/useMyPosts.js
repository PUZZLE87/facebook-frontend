import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_MYPOSTS_FAIL,
  GET_MYPOSTS_SUCCESS,
  GET_MYPOSTS_REQUEST,
} from "../redux/actions/types";
import useAxiosPrivate from "./useAxiosPrivate";

const useMyPosts = (username, pageNum = 1, pageLimit = 3) => {
  const dispatch = useDispatch();
  const axiosPrivte = useAxiosPrivate();

  useEffect(() => {
    dispatch({ type: GET_MYPOSTS_REQUEST });
    const controller = new AbortController();
    const { signal } = controller;
    axiosPrivte
      .post(
        `/post/myPosts?pageNum=${pageNum}&pageLimit=${pageLimit}`,
        { username },
        { signal }
      )
      .then(({ data }) => {
        dispatch({
          type: GET_MYPOSTS_SUCCESS,
          payload: {
            posts: data?.docs,
            hasNextPage: data?.hasNextPage,
            totalPages: data?.totalPages,
            nextPage: data?.nextPage,
          },
        });
      })
      .catch((error) => {
        if (signal.aborted) return;
        dispatch({
          type: GET_MYPOSTS_FAIL,
          payload: { errorMessage: error.response?.data?.message },
        });
      });
    return () => {
      controller.abort();
    };
  }, [pageNum, pageLimit]);
};

export default useMyPosts;
