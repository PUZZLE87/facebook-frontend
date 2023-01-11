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

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const profile = useSelector((state) => state?.profile);
  const [showOldCovers, setShowOldCovers] = useState(false);

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
      <div className="bg-white">
        <div className="m-auto xl:w-[70%] lg:w-[90%]">
          <Header />
          <div className="mt-14 bg-white">
            {profile?.isLoading && <BarLoader />}
            <Cover setShowOldCovers={setShowOldCovers} />
            <ProfileInfo />
          </div>
          {showOldCovers && <OldCovers setShowOldCovers={setShowOldCovers} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
