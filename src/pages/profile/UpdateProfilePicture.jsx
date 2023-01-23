import {
  ComputerDesktopIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  CHANGE_PROFILE_PICTURE,
  CHANGE_USER_PICTURE,
} from "../../redux/actions/types";
import "react-lazy-load-image-component/src/effects/blur.css";
import CropProfilePictrue from "./CropProfilePictrue";

const UpdateProfilePicture = ({ setShowUpdateProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userInfo);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const imageInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    axiosPrivate
      .post(
        "/user/profileImages",
        {
          path: `${user?.username}/profile_pictures`,
          max: 20,
          sort: "desc",
        },
        { signal }
      )
      .then(({ data }) => {
        setImages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (signal.aborted) return;
        setErrorMessage(err?.response?.data?.message);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const changeProfile = (e) => {
    const url = e.target?.src;
    if (!url) return;
    axiosPrivate
      .post("/user/updatePicture", { url })
      .then(({ data }) => {
        dispatch({ type: CHANGE_PROFILE_PICTURE, payload: { picture: data } });
        dispatch({ type: CHANGE_USER_PICTURE, payload: { picture: data } });
        setShowUpdateProfile(false);
      })
      .catch((err) => setErrorMessage(err?.response?.data?.message));
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMessage(`${file.name} format is not supported`);
      setProfilePicture("");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setErrorMessage(`${file.name} is to large max 2mp allowed`);
      setProfilePicture("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };
  };

  return (
    <div className="fixed z-50 bg-opacity-80 inset-0  bg-white">
      <div className="absolute w-[336px] sm:w-[440px] lg:w-[544px] shadowl-lg rounded-lg bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between p-3">
          <span className="text-lg text-gray-700 font-semibold">
            Update profile picture
          </span>
          <XMarkIcon
            onClick={() => setShowUpdateProfile(false)}
            className="w-7 rounded-full p-1 bg-gray-200 hover:bg-gray-300 hover:text-red-500 transition-colors cursor-pointer"
          />
        </div>
        <div className="divider"></div>
        <div className="flex justify-evenly  p-2 spac-x-2">
          <button
            onClick={() => imageInputRef.current?.click()}
            className=" flex space-x-1 justify-center itmes-center rounded-lg bg-blue-50 text-blue-500 font-bold grow p-2 hover:bg-blue-100 transition-colors"
          >
            <PlusIcon className="w-5" />
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onInput={handleImage}
            onClick={(e) => (e.target.value = null)}
            ref={imageInputRef}
            hidden
          />
          <button className=" flex space-x-1 justify-center itmes-center rounded-lg bg-gray-10 text-gray-600 font-bold grow p-2">
            <ComputerDesktopIcon className="w-5" />
            <span>Add frame</span>
          </button>
        </div>
        <p className="p-2 mt-4 font-semibold text-lg text-center text-blue-600 border-b-4 border-b-blue-500">
          Recent profile pictrues
        </p>
        <div className="overflow-y-scroll relative overflow-x-hidden space-y-2 flex flex-wrap justify-start items-center content-start  h-[550px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full p-3">
          {isLoading && (
            <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <FadeLoader size={82} color="#3867d6" />
            </span>
          )}
          {images?.map((image) => (
            <span
              key={image.id}
              className="w-24 h-24 rounded-xl mr-2 overflow-hidden cursor-pointer hover:scale-110 transition-transform"
            >
              <LazyLoadImage
                effect="blur"
                onClick={changeProfile}
                src={image?.url}
                alt=""
                className="object-cover w-24 h-24"
              />
            </span>
          ))}
        </div>
      </div>
      {profilePicture && (
        <CropProfilePictrue
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          setImages={setImages}
        />
      )}
    </div>
  );
};

export default UpdateProfilePicture;
