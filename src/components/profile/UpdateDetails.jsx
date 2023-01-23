import {
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  HomeIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CHANGE_PROFILE_DETAILS } from "../../redux/actions/types";

const GetIcon = ({ iconName }) => {
  switch (iconName) {
    case "briefCase":
      return <BriefcaseIcon className="w-6 text-gray-500" />;
    case "academicCap":
      return <AcademicCapIcon className="w-6 text-gray-500" />;
    case "heart":
      return <HeartIcon className="w-6 text-gray-500" />;
    case "home":
      return <HomeIcon className="w-6 text-gray-500" />;
    case "instagram":
      return <img src="/assets/icons/instagram.png" className="w-7" alt="" />;
    default:
      return "";
  }
};

const UpdateDetails = ({ fieldName, defaultText, iconName, max, text }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [detailText, setDetailText] = useState(text);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const updateUserDetails = async () => {
    try {
      await axiosPrivate.post("/user/updateDetails", {
        infos: { [fieldName]: detailText },
      });
      dispatch({
        type: CHANGE_PROFILE_DETAILS,
        payload: { details: { [fieldName]: detailText } },
      });
      setShowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-1">
      <div>
        {!text && (
          <div className="py-2 flex items-center space-x-2">
            <PlusIcon className="w-9 text-blue-500 rounded-full border-2 border-blue-500 p-1" />
            <span
              onClick={() => setShowEdit(true)}
              className="text-blue-500 text-lg hover:underline cursor-pointer"
            >
              {defaultText}
            </span>
          </div>
        )}
        {text && (
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <GetIcon iconName={iconName} />
              <span>{text}</span>
            </div>
            <PencilIcon
              onClick={() => setShowEdit(true)}
              className="w-5 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
            />
          </div>
        )}
        {showEdit && (
          <div className="flex flex-col">
            {Array.isArray(defaultText) && defaultText?.length > 0 ? (
              <select
                onChange={(e) => setDetailText(e.target.value)}
                className="rounded-lg bg-gray-100 mt-2"
              >
                {defaultText.map((value, index) => (
                  <option
                    selected={value === text ? true : false}
                    value={value}
                    key={index}
                  >
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                maxLength={max}
                placeholder={defaultText}
                className="rounded-md bg-gray-100 h-20 mt-2 text-gray-700"
                onChange={(e) => {
                  setDetailText(e.target.value);
                }}
                value={detailText}
              />
            )}
            <div className="flex items-center self-end space-x-4 mt-5 mb-2 pr-3">
              <button
                onClick={() => setShowEdit(false)}
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
    </div>
  );
};

export default UpdateDetails;
