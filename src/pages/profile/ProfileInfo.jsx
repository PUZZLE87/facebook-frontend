import {
  CameraIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfilePicture from "./UpdateProfilePicture";

const ProfileInfo = () => {
  const userProfile = useSelector((state) => state?.profile?.profileInfo);
  const user = useSelector((state) => state?.user?.userInfo);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const isMyProfile = userProfile?.username === user?.username;

  return (
    <>
      <div className="flex -translate-y-[50px] px-4 md:flex-row flex-col justify-start items-center">
        <div className="md:mr-3">
          <span className="relative inline-block">
            <img
              src={userProfile?.picture}
              alt=""
              className="w-44 h-44 object-cover rounded-full border-4 border-white"
            />
            {isMyProfile && (
              <span className="absolute right-0 top-28 hover:bg-blue-100 cursor-pointer transition-colors hover:text-blue-600  bg-gray-200 p-2 rounded-full text-gray-700">
                <CameraIcon
                  onClick={() => setShowUpdateProfile(true)}
                  className="w-6"
                />
              </span>
            )}
          </span>
        </div>
        <span className="text-4xl  flex flex-col font-semibold text-gray-700">
          <span>
            {userProfile?.first_name} {userProfile?.last_name}
          </span>
          <span className="text-2xl self-center text-gray-500">
            {userProfile?.details?.otherName}
          </span>
        </span>
        <div className="flex space-x-2  mt-6 md:grow md:mt-28 justify-end itmes-end">
          <button className="flex items-center justfiy-center space-x-2 bg-blue-600 text-gray-100 px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer ">
            <PlusCircleIcon className="w-6" />
            <span>Add to story</span>
          </button>
          <button className="flex items-center justfiy-center space-x-2 bg-gray-200 text-gray-500 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer ">
            <PencilIcon className="w-6 text-gray-600" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
      {showUpdateProfile && (
        <UpdateProfilePicture setShowUpdateProfile={setShowUpdateProfile} />
      )}
    </>
  );
};

export default ProfileInfo;
