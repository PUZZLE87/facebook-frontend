import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useClickOutside from "../../hooks/useClickOutside";
import { SET_COVER_CLEAR } from "../../redux/actions/types";
import getCroppedImage from "../../helpers/getImage";
import setCoverAction from "../../redux/actions/setCover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  ArrowDownTrayIcon,
  CameraIcon,
  GlobeAsiaAustraliaIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Cropper from "react-easy-crop";
import { PulseLoader } from "react-spinners";

const Cover = ({ setShowOldCovers }) => {
  const profileInfo = useSelector((state) => state?.profile?.profileInfo);
  const cover = useSelector((state) => state?.cover);
  const user = useSelector((state) => state?.user?.userInfo);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const inputImgRef = useRef(null);
  const coverRef = useRef(null);
  const [coverPicture, setCoverPicture] = useState("");
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const menuRef = useRef(null);
  const isMyProfile = profileInfo?.username === user?.username;
  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const handleImage = (e) => {
    setShowCoverMenu(false);
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMsg(`${file.name} format is not supported`);
      setCoverPicture("");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setErrorMsg(`${file.name} is to large max 2mp allowed`);
      setCoverPicture("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setCoverPicture(e.target.result);
    };
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cancelCoverChange = () => {
    setCoverPicture("");
  };

  const updateCover = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;
      const img = await getCroppedImage(coverPicture, croppedAreaPixels);
      console.log(img);
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      dispatch(setCoverAction(formData, axiosPrivate, signal, setCoverPicture));
    } catch (error) {
      setErrorMsg("Error In crop and update cover");
    }
  };

  return (
    <div ref={coverRef} className="h-96 w-full relative m-auto">
      <div className="lazyImage w-full lg:rounded-br-xl lg:rounded-bl-xl overflow-hidden h-full">
        <LazyLoadImage
          src={coverPicture || profileInfo?.cover}
          alt=""
          effect="blur"
        />
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onInput={handleImage}
        onClick={(e) => (e.target.value = null)}
        ref={inputImgRef}
        hidden
      />

      {isMyProfile && (
        <div
          ref={menuRef}
          className="absolute z-20 text-gray-700 right-5 bg-opacity-90 bg-white cursor-pointer rounded-lg bottom-16 "
        >
          <div className="relative w-44">
            <div
              className="flex items-center p-2 space-x-2"
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <CameraIcon className="w-8 h-8" />
              <span className="font-semibold">Add Cover Photo</span>
            </div>
            {showCoverMenu && (
              <div className="absolute flex flex-col bg-white shadow-md left-0 overflow-hidden rounded-lg w-full top-[52px]">
                <div
                  onClick={() => setShowOldCovers(true)}
                  className="flex hover:bg-blue-100 transition-colors items-center space-x-2 p-2"
                >
                  <PhotoIcon className="w-8 h-8" />
                  <span>Select Photo </span>
                </div>
                <div
                  onClick={() => inputImgRef.current.click()}
                  className="flex hover:bg-blue-100 transition-colors items-center space-x-2 p-2"
                >
                  <ArrowDownTrayIcon className="w-8 h-8" />
                  <span> Upload Photo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(coverPicture || cover?.isLoading) && (
        <>
          <Cropper
            image={coverPicture}
            zoom={zoom}
            crop={crop}
            aspect={coverRef.current?.getBoundingClientRect().width / 384}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
          />
          <div className="absolute w-full top-0 bg-gray-800 bg-opacity-80 flex text-gray-200 py-2 px-4 justify-between items-center">
            <div className="flex items-center space-x-2">
              <GlobeAsiaAustraliaIcon className="w-8" />
              <span> Your cover photo is public </span>
            </div>
            <div className="flex space-x-4">
              {!cover?.isLoading && (
                <button
                  onClick={cancelCoverChange}
                  className=" bg-gray-600 py-2 font-semibold px-6 hover:text-red-400 transition-colors cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={updateCover}
                className="bg-blue-500 rounded-lg font-semibold py-2 px-6 hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {cover?.isLoading ? (
                  <PulseLoader color="#fff" size={5} />
                ) : (
                  "save changes"
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {(errorMsg || cover?.errorMessage) && (
        <div className="inset-0 absolute overflow-hidden lg:rounded-br-lg lg:rounded-bl-lg">
          <div className="bg-white opacity-90 w-full h-full flex justify-around items-center">
            <span className="text-red-600 text-lg">
              {errorMsg || cover?.errorMessage}
            </span>
            <button
              className="p-2 w-32 bg-blue-500 text-gray-100 font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => {
                setErrorMsg("");
                dispatch({ type: SET_COVER_CLEAR });
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cover;
