import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftLink from "./LeftLink";
import { left } from "../../../data/home";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const HomeLeft = () => {
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  return (
    <div className="fixed hidden sm:block top-0 left-0 h-full pb-4 pt-16">
      <div className="flex flex-col items-center xl:items-stretch px-3 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-2xl xl:w-56 space-y-1 ">
        <Link
          to="/"
          className="flex space-x-2 items-center p-2 xl:mr-3 xl:w-auto xl:h-auto bg-gray-300 rounded-full hover:bg-gray-400 xl:bg-transparent xl:hover:bg-gray-300 transition-colors xl:rounded-lg"
        >
          <img
            className="rounded-full shrink-0 w-9 h-9 object-cover"
            src={user?.userInfo?.picture}
            alt=""
          />
          <span className="font-semibold text-md hidden  xl:block">
            {user?.userInfo?.username}
          </span>
        </Link>
        {left.slice(0, visible ? left.length : 8).map((item, index) => (
          <LeftLink
            key={index}
            img={item.img}
            text={item.text}
            notification={item?.notification}
          />
        ))}
        {visible ? (
          <div
            onClick={() => setVisible(false)}
            className="flex justify-center px-2 hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors cursor-pointer py-2 xl:rounded-lg items-center space-x-2 xl:w-auto xl:h-auto xl:bg-transparent xl:justify-start font-semibold w-12 h-12 bg-gray-300 rounded-full"
          >
            <span className="p-2 rounded-full bg-gray-400 shrink-0">
              <ChevronUpIcon className="w-5" />
            </span>
            <span className="hidden xl:block">Show less</span>
          </div>
        ) : (
          <div
            onClick={() => setVisible(true)}
            className="flex justify-center px-2 hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors cursor-pointer py-2 xl:rounded-lg items-center space-x-2 xl:w-auto xl:h-auto xl:bg-transparent xl:justify-start font-semibold w-12 h-12 bg-gray-300 rounded-full"
          >
            <span className="p-2 rounded-full bg-gray-400 shrink-0">
              <ChevronDownIcon className="w-5" />
            </span>
            <span className="hidden xl:block">See more</span>
          </div>
        )}
        <div className="divider bg-gray-400"></div>
        <p className="text-gray-800 px-2 font-semibold text-lg hidden xl:block">
          Your Shortcuts
        </p>
        <Link
          to="/"
          className="flex shrink-0 items-center overflow-hidden justify-center xl:justify-start space-x-2 font-semibold xl:hover:bg-gray-300 hover:bg-gray-400 transition-colors rounded-full bg-gray-300 xl:bg-transparent w-12 h-12 xl:w-auto xl:h-auto xl:rounded-lg p-1"
        >
          <span className="p-1 w-11 h-11">
            <img src="/assets/images/ytb.png" className="rounded-lg" alt="" />
          </span>
          <span className="hidden xl:block">My youtube channel</span>
        </Link>
        <Link
          to="/"
          className="flex items-center  justify-center xl:justify-start space-x-2 font-semibold xl:hover:bg-gray-300 hover:bg-gray-400 transition-colors rounded-full bg-gray-300 xl:bg-transparent w-12 h-12 xl:w-auto xl:h-auto xl:rounded-lg p-2 xl:px-1 xl:py-2"
        >
          <img
            src="/assets/images/insta.png"
            className=" shrink-0 w-10"
            alt=""
          />
          <span className="hidden xl:block">My instagram</span>
        </Link>
      </div>
    </div>
  );
};

export default HomeLeft;
