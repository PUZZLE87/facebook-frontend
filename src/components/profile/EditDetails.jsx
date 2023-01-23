import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import UpdateDetails from "./UpdateDetails";

const EditDetails = ({ setShowDetails }) => {
  const userDetails = useSelector(
    (state) => state.profile.profileInfo?.details
  );
  return (
    <div className="fixed z-50 inset-0 bg-white bg-opacity-90">
      <div className="absolute w-[320px] sm:w-[450px] md:w-[550px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg">
        <div className="p-3 flex justify-between">
          <span className="text-xl font-semibold text-gray-700">
            Edit Details
          </span>
          <XMarkIcon
            onClick={() => setShowDetails(false)}
            className="w-8 h-8 bg-gray-100 rounded-full p-1 text-gray-700 hover:bg-gray-200 hover:text-red-400 transition-colors cursor-pointer"
          />
        </div>
        <div className="divider"></div>
        <div className="p-3 h-[650px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-200">
          <div className="leading-3 mb-4">
            <h3 className="text-gray-800 text-lg font-semibold">
              Customize your intro
            </h3>
            <p className="text-md text-gray-500">
              Details you select will be public
            </p>
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Other name</p>
            <UpdateDetails
              fieldName="otherName"
              defaultText="Add other name"
              iconName="academicCap"
              max={20}
              text={userDetails?.otherName}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Work</p>
            <UpdateDetails
              fieldName="job"
              defaultText="Add a job"
              iconName="briefCase"
              max={30}
              text={userDetails?.job}
            />
            <UpdateDetails
              fieldName="workPlace"
              defaultText="Add a workplace"
              iconName="briefCase"
              max={40}
              text={userDetails?.workPlace}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Work</p>
            <UpdateDetails
              fieldName="highSchool"
              defaultText="Add a high school"
              iconName="academicCap"
              max={20}
              text={userDetails?.highSchool}
            />
            <UpdateDetails
              fieldName="college"
              defaultText="Add college"
              iconName="academicCap"
              max={20}
              text={userDetails?.college}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Current city</p>
            <UpdateDetails
              fieldName="currentCity"
              defaultText="Add a current city"
              iconName="home"
              max={30}
              text={userDetails?.currentCity}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Hometown</p>
            <UpdateDetails
              fieldName="hometown"
              defaultText="Add hometown"
              iconName="home"
              max={30}
              text={userDetails?.hometown}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Relationship</p>
            <UpdateDetails
              fieldName="relationship"
              defaultText={[
                "In a relationship",
                "Single",
                "Married",
                "Divorced",
              ]}
              iconName="heart"
              max={20}
              text={userDetails?.relationship}
            />
          </div>
          <div className="py-3">
            <p className="text-xl font-bold">Instagram</p>
            <UpdateDetails
              fieldName="instagram"
              defaultText="Add instagram"
              iconName="instagram"
              max={30}
              text={userDetails?.instagram}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
