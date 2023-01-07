import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  HomeActive,
  Friends,
  Watch,
  Market,
  Gaming,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
} from "../../svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchMenu from "./SearchMenu";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";

const Header = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const AllMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useClickOutside(AllMenuRef, () => {
    setShowAllMenu(false);
  });
  useClickOutside(userMenuRef, () => {
    setShowUserMenu(false);
  });

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50 h-14 ">
      <div className="relative h-full flex items-center justify-between">
        {/** Header Left **/}
        <div className="flex items-center space-x-1 px-3 h-full">
          <Link to="/">
            <Logo />
          </Link>

          <div
            className="relative flex items-center "
            onClick={() => setShowSearchMenu(true)}
          >
            <span className="absolute bg-gray-200 hover:bg-gray-300 xl:hover:bg-transparent  transition-colors cursor-pointer p-3 xl:p-0 xl:bg-transparent rounded-full  sm:ml-3 text-gray-600 ">
              <MagnifyingGlassIcon className="w-5 " />
            </span>
            <input
              type="text"
              className="w-full hidden xl:block   border-none rounded-full text-gray-600 text-md bg-gray-200  pl-9"
              placeholder="Search Facebook"
            />
          </div>
        </div>
        {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}

        {/** Header Middle **/}
        <div className="flex items-center space-x-1  lg:space-x-8 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 hidden sm:block transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <HomeActive />
          </NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Friends />
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 transition-colors hidden sm:block relative " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Watch />
            <span className="absolute top-1 left-4 p-2 w-5 h-5 text-sm rounded-full flex items-center justify-center text-gray-200 font-bold bg-red-600">
              19
            </span>
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 hidden sm:block transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Market />
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 hidden md:block  px-6 transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Gaming />
          </NavLink>
        </div>
        {/** Header Right **/}
        <div className="flex items-center justify-end pr-3 space-x-1 lg:space-x-4 ">
          <NavLink
            to={`/profile/${user?.userInfo?.username}`}
            className="flex justify-center items-center space-x-1  rounded-full transition-colors hover:bg-gray-200 p-1"
          >
            <div className="overflow-hidden sm:flex w-8 border-[1px] hidden  border-gray-100  h-8 rounded-full">
              <img
                src={user?.userInfo?.picture}
                alt=""
                className="object-cover"
              />
            </div>
            <span className="text-md font-semibold  hidden lg:block text-gray-700 pr-2">
              {user?.userInfo?.username}
            </span>
          </NavLink>
          <div ref={AllMenuRef}>
            <div
              onClick={() => setShowAllMenu((prev) => !prev)}
              className={`bg-gray-200 p-1 flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-300  transition-colors rounded-full ${
                showAllMenu && "bg-blue-100"
              }`}
            >
              <Menu color={showAllMenu && "#1b74e4"} />
            </div>
            {showAllMenu && <AllMenu />}
          </div>
          <div className="md:block hidden">
            <div className="bg-gray-200 p-1 flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-300  transition-colors rounded-full">
              <Messenger />
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-200 p-1 flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-300  transition-colors rounded-full">
              <Notifications />
              <span className="absolute  -top-1 text-sm font-semibold -right-2 bg-red-600 text-gray-200 rounded-full  w-5 h-5 flex justify-center items-center">
                5
              </span>
            </div>
          </div>
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setShowUserMenu((prev) => !prev)}
              className={`bg-gray-200 p-1 flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-300  transition-colors rounded-full ${
                showUserMenu && "bg-blue-100"
              }`}
            >
              <ArrowDown color={showUserMenu && "#1b74e4"} />
            </div>
            {showUserMenu && <UserMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
