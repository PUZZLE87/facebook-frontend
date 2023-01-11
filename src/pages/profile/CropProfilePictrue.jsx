import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import getCroppedImg from "../../helpers/getImage";
import setProfilePictureAction from "../../redux/actions/setProfilePictureAction";
import uniqueId from "uniqueid";
import {
  ClockIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Cropper from "react-easy-crop";
import { PulseLoader } from "react-spinners";

const CropProfilePictrue = ({
  profilePicture,
  setProfilePicture,
  setImages,
}) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [zoom, setZoom] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const sliderRef = useRef(null);
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropPhoto = async () => {
    try {
      const img = await getCroppedImg(profilePicture, croppedAreaPixels);
      setProfilePicture(img);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (error) {
      setErrorMsg("Error in crop");
    }
  };

  const zoomIn = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };
  const zoomOut = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const img = await getCroppedImg(profilePicture, croppedAreaPixels);
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      dispatch(setProfilePictureAction(formData, axiosPrivate));
      setImages((prev) => [{ id: uniqueId("profilepic"), url: img }, ...prev]);
      setIsLoading(false);
      setSuccessMsg("Profile picture update successfully");
      setErrorMsg("");
    } catch (error) {
      console.log(error);
      setErrorMsg("Error in crop and update profile pictrue");
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white bg-opacity-95">
      <div className="absolute bg-white w-[320px] sm:w-[500px] shadow-lg rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="p-3 flex justify-between text-gray-600">
          <p className="text-lg font-bold">Update profile picture</p>
          <XMarkIcon
            onClick={() => setProfilePicture("")}
            className="w-7 p-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:text-red-500 transition-colors cursor-pointer"
          />
        </div>
        <div className="divider"></div>
        <div className="relative h-[400px]">
          <Cropper
            image={profilePicture}
            zoom={zoom}
            crop={crop}
            aspect={1 / 1}
            cropShape="round"
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
            showGrid={true}
          />
        </div>
        <div className="p-3 flex items-center justify-between space-x-4">
          <MinusCircleIcon
            onClick={zoomOut}
            className="w-7 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          />
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={zoom}
            ref={sliderRef}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none"
          />
          <PlusCircleIcon
            className="w-6 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            onClick={zoomIn}
          />
        </div>
        <div className="flex justify-center space-x-3 my-4">
          <button
            onClick={cropPhoto}
            className="flex space-x-2 items-center bg-gray-100 py-1 px-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <img
              src="/assets/icons/crop.png"
              alt=""
              className="w-5 h-5 opacity-90"
            />
            <span>Crop Photo </span>
          </button>
          <button className="flex space-x-2 items-center bg-gray-100 py-1 px-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <ClockIcon className="w-5 h-5" />
            <span>Make Temporary </span>
          </button>
        </div>
        {successMsg && (
          <div className="text-green-600 mb-2 text-lg text-center">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="text-red-600 mb-2 text-lg text-center">
            {errorMsg}
          </div>
        )}
        <div className="divider"></div>
        <div className="flex justify-end space-x-3 p-5">
          {!isLoading && (
            <button
              className="text-blue-500 hover:text-blue-700 font-bold transition-colors"
              onClick={() => setProfilePicture("")}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-blue-500 px-5 py-1 text-gray-100 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={updateProfile}
          >
            {isLoading ? <PulseLoader color="#FFF" size={5} /> : "save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropProfilePictrue;
