import React, { useCallback, useEffect, useRef, useState } from "react";
import useMyPosts from "../../hooks/useMyPosts";
import { useSelector, useDispatch } from "react-redux";
import { GET_MYPOSTS_CLEAN } from "../../redux/actions/types";
import { FadeLoader } from "react-spinners";
import Post from "../posts/Post";

const MyPosts = ({ username }) => {
  const [pageNum, setPageNum] = useState(1);
  const posts = useSelector((state) => state?.myPosts);
  const dispatch = useDispatch();

  useMyPosts(username, pageNum);

  useEffect(() => {
    dispatch({ type: GET_MYPOSTS_CLEAN });
    setPageNum(1);
  }, [username]);

  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (posts?.isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && posts?.hasNextPage) {
          setPageNum(posts?.nextPage);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [posts?.isLoading, posts?.hasNextPage, posts?.nextPage]
  );

  useEffect(() => {
    return () => dispatch({ type: GET_MYPOSTS_CLEAN });
  }, [dispatch]);

  return (
    <div className="mt-3 mb-12 space-y-3">
      {posts?.posts.map((post, i) => {
        if (posts?.posts?.length === i + 1) {
          return <Post key={post?._id} ref={lastPostRef} post={post} />;
        } else {
          return <Post key={post?._id} post={post} />;
        }
      })}
      {posts?.isLoading && (
        <div className="fixed left-[50%] bottom-6">
          <FadeLoader size={50} color="#1b74e4" />
        </div>
      )}
    </div>
  );
};

export default MyPosts;
