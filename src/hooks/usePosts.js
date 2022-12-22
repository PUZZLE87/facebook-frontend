import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_POSTS_FAIL,
  GET_POSTS_SUCCES,
  GET_POSTS_REQUEST,
} from "../redux/actions/types";
import useAxiosPrivate from "./useAxiosPrivate";

const usePosts = (pageNum = 1, pageLimit = 3) => {
  const dispatch = useDispatch();
  const axiosPrivte = useAxiosPrivate();

  useEffect(() => {
    dispatch({ type: GET_POSTS_REQUEST });
    const controller = new AbortController();
    const { signal } = controller;
    axiosPrivte
      .get(`/post/posts?pageNum=${pageNum}&pageLimit=${pageLimit}`, { signal })
      .then(({ data }) => {
        dispatch({
          type: GET_POSTS_SUCCES,
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
          type: GET_POSTS_FAIL,
          payload: { errorMessage: error.response?.data?.message },
        });
      });
    return () => {
      controller.abort();
    };
  }, [pageNum, pageLimit]);
};

export default usePosts;
