import {
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CHANGE_PROFILE_DETAILS } from "../../redux/actions/types";
import EditDetails from "./EditDetails";

const Details = () => {
  const userDetails = useSelector(
    (state) => state.profile?.profileInfo?.details
  );
  const userProfile = useSelector((state) => state.profile?.profileInfo);
  const user = useSelector((state) => state?.user?.userInfo);
  const isMyProfile = userProfile?.username === user?.username;

  const [bioLength, setBioLength] = useState(100 - userDetails?.bio?.length);
  const [bioText, setBioText] = useState(userDetails?.bio);
  const [showBio, setShowBio] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const updateUserDetails = async () => {
    try {
      await axiosPrivate.post("/user/updateDetails", {
        infos: { bio: bioText },
      });
      dispatch({
        type: CHANGE_PROFILE_DETAILS,
        payload: { details: { bio: bioText } },
      });
      setShowBio(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div>
        <h4 className="text-gray-700 text-xl font-semibold">Intro</h4>
        <p className="text-gray-700 pl-1 py-2"> {userDetails?.bio} </p>
        {!showBio && isMyProfile && (
          <button
            onClick={() => setShowBio(true)}
            className="bg-gray-100 w-full mb-2 p-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            {userDetails?.bio ? "Edit" : "Add"} Bio
          </button>
        )}
        {showBio && (
          <div className="flex flex-col">
            <textarea
              maxLength={100}
              placeholder="Add Bio"
              className="rounded-md bg-gray-100 h-20 mt-2 text-gray-700"
              onChange={(e) => {
                setBioLength(100 - e.target.value.length);
                setBioText(e.target.value);
              }}
              value={bioText}
            />
            {bioLength > 0 && (
              <span className="self-end text-sm text-gray-500">
                {bioLength} characters remaining{" "}
              </span>
            )}
            <div className="flex items-center self-end space-x-4 mt-5 mb-2 pr-3">
              <button
                onClick={() => setShowBio(false)}
                className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateUserDetails}
                className="bg-blue-500 text-gray-50 py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {userDetails?.workPlace && userDetails?.job && (
          <div className="flex space-x-1 px-2 py-1">
            <BriefcaseIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">
              Work as {userDetails?.job} at {userDetails?.workPlace}
            </span>
          </div>
        )}
        {userDetails?.relationship && (
          <div className="flex space-x-1 px-2 py-1">
            <HeartIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">{userDetails?.relationship}</span>
          </div>
        )}
        {userDetails?.college && (
          <div className="flex space-x-1 px-2 py-1">
            <AcademicCapIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">
              Studied at {userDetails?.college}
            </span>
          </div>
        )}
        {userDetails?.highSchool && (
          <div className="flex space-x-1 px-2 py-1">
            <AcademicCapIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">
              Studied at {userDetails?.highSchool}
            </span>
          </div>
        )}
        {userDetails?.currentCity && (
          <div className="flex space-x-1 px-2 py-1">
            <HomeIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">
              Lives in {userDetails?.currentCity}
            </span>
          </div>
        )}
        {userDetails?.hometown && (
          <div className="flex space-x-1 px-2 py-1">
            <HomeIcon className="w-5 text-gray-500" />
            <span className="text-gray-800">from {userDetails?.hometown}</span>
          </div>
        )}
        {userDetails?.instagram && (
          <a
            href={`https://www.instagram.com/${userDetails?.instagram}`}
            target="_blank"
            rel="noreferrence"
            className="flex space-x-1 px-2 py-1"
          >
            <img
              src="/assets/icons/instagram.png"
              className="w-6 h-6 text-gray-500"
              alt=""
            />
            <span className="text-gray-800"> {userDetails?.instagram} </span>
          </a>
        )}
        {isMyProfile && (
          <button
            onClick={() => setShowDetails(true)}
            className="bg-gray-100 w-full p-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            Edit Details
          </button>
        )}
      </div>
      {showDetails && <EditDetails setShowDetails={setShowDetails} />}
    </div>
  );
};

export default Details;
