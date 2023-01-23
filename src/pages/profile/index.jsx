import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import getProfileAction from "../../redux/actions/getProfileAction";
import { GET_PROFILE_CLEAR } from "../../redux/actions/types";
import BarLoader from "../../components/ui/BarLoader";
import Cover from "./Cover";
import OldCovers from "./OldCovers";
import ProfileInfo from "./ProfileInfo";
import ProfileMenu from "./ProfileMenu";
import Details from "../../components/profile/Details";
import CreatePost from "../../components/createPost";
import CreatePostPopup from "../../components/createPostPopup";
import MyPosts from "../../components/profile/MyPosts";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const profile = useSelector((state) => state?.profile);
  const [showOldCovers, setShowOldCovers] = useState(false);
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getProfileAction(username, axiosPrivate, signal));

    return () => {
      controller.abort();
      dispatch({ type: GET_PROFILE_CLEAR });
    };
  }, [username]);

  return (
    <div>
      {visibleCreatePost && (
        <CreatePostPopup setVisibleCreatePost={setVisibleCreatePost} />
      )}
      <div className="bg-white">
        <div className="m-auto xl:w-[70%] lg:w-[90%]">
          <Header />
          <div className="mt-14 bg-white">
            {profile?.isLoading && <BarLoader />}
            <Cover setShowOldCovers={setShowOldCovers} />
            <ProfileInfo />
          </div>
          {showOldCovers && <OldCovers setShowOldCovers={setShowOldCovers} />}
          <div className="divider"></div>
          <ProfileMenu />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center m-auto items-start xl:w-[70%] lg:w-[90%]">
        <div className="mt-3 p-2 lg:w-[500px] w-full z-30 lg:sticky lg:top-14">
          {/* details */}
          <Details />

          {/* friends */}
        </div>
        <div className="grow mt-3 w-full p-2">
          {/* create post */}
          <CreatePost setVisibleCreatePost={setVisibleCreatePost} />

          {/* my posts */}
          <MyPosts username={username} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
