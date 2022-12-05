import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef } from "react";
import { useSelector } from "react-redux";

const SearchMenu = ({ setShowSearchMenu }) => {
  const searchBox = useRef(null);
  const searchIcon = useRef(null);
  const user = useSelector(state => state?.user);


  useClickOutside(searchBox, () => {
    setShowSearchMenu(false);
  });

  return (
    <div
      ref={searchBox}
      className="w-80 fixed z-50 top-0 left-0 bg-white shadow-lg p-3 h-96 rounded-tr-lg rounded-br-lg"
    >
      <div className="flex items-center justify-between w-full">
        <span onClick={() => setShowSearchMenu(false)}>
          <ArrowLeftIcon className="w-10 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer " />
        </span>
        <div className="relative flex items-center ">
          <span className="absolute ml-3 text-gray-600" ref={searchIcon}>
            <MagnifyingGlassIcon className="w-5" />
          </span>
          <input
            onFocus={() => (searchIcon.current.style.display = "none")}
            onBlur={() => (searchIcon.current.style.display = "block")}
            autoFocus={true}
            type="text"
            className="w-full border-none rounded-full text-gray-600 text-md bg-gray-200 pl-9"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      <div className="text-lg flex items-center justify-between mt-3">
        <span className="text-gray-600 font-semibold">Recent searches</span>
        <span className="text-blue-500 ">Edit</span>
      </div>
      <div className="text-lg flex justify-between hover:bg-gray-200 transition-colors rounded-lg text-gray-700 items-center p-2">
        <span className="flex items-center justify-start ">
          <img src={user?.userInfo?.picture} alt="" className="w-8 h-8 rounded-full mr-2 bg-gray-300 object-cover" />
          <span>sadra</span>
        </span>
        <XMarkIcon className="w-4 text-red-400 hover:text-red-600 transition-colors cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchMenu;
