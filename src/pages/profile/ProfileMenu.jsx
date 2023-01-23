import React from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-start  space-x-3 text-gray-600 font-semibold pt-3">
        <Link
          to="/"
          className="p-2 text-blue-600 border-b-blue-600 border-b-2 "
        >
          Posts
        </Link>
        <Link to="/" className="p-2">
          About
        </Link>
        <Link to="/" className="p-2">
          Friends
        </Link>
        <Link to="/" className="p-2">
          Photos
        </Link>
        <Link to="/" className="p-2">
          Videos
        </Link>
        <Link to="/" className="p-2">
          Check-Ins
        </Link>
        <Link to="/" className="p-2">
          More
        </Link>
      </div>
    </div>
  );
};

export default ProfileMenu;
