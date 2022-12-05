import { useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
  Cog8ToothIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import SettingPrivacy from "./SettingPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import { useSelector, useDispatch } from "react-redux";
import logoutAction from "../../../redux/actions/logoutAcion";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UserMenu = () => {
  const [visible, setVisible] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = () => {
    dispatch(logoutAction(axiosPrivate));
  };
  return (
    <div className="absolute top-12 p-4 w-80 lg:w-96 right-2 shadow-lg bg-white rounded-lg overflow-hidden">
      {visible === 0 && (
        <div>
          <div className="flex items-center   space-x-2 justify-start hover:bg-gray-200 transition-colors cursor-pointer py-1 px-2 rounded-lg">
            <div className="w-14 h-14 border-[1px] border-gray-100 flex  overflow-hidden rounded-full">
              <img
                src={user?.userInfo?.picture}
                alt=""
                className="object-cover "
              />
            </div>
            <div className="">
              <p className="font-bold leading-4 text-gray-800">
                {user?.userInfo?.username}
              </p>
              <p className="text-gray-600 leading-4 ">See your profile</p>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex space-x-2 hover:bg-gray-200 transition-colors cursor-pointer rounded-lg  p-2 items-center">
            <div className="w-10 p-2 rounded-full bg-gray-100">
              <ChatBubbleLeftEllipsisIcon />
            </div>
            <div className="text-gray-800">
              <p className="leading-4 font-semibold">Give feedback</p>
              <p className="leading-4 text-gray-600 text-sm">
                Help us improve facebook
              </p>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div
            onClick={() => setVisible(1)}
            className="flex justify-between px-3 py-2  cursor-pointer hover:bg-gray-200 transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 p-2 bg-gray-100 rounded-full">
                <Cog8ToothIcon />
              </div>
              <div className="text-gray-800 font-bold">Settings & privacy</div>
            </div>
            <div className="w-10 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
            onClick={() => setVisible(2)}
            className="flex justify-between px-3 py-2  cursor-pointer hover:bg-gray-200 transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 p-2 bg-gray-100 rounded-full">
                <QuestionMarkCircleIcon />
              </div>
              <div className="text-gray-800 font-bold">Help & support</div>
            </div>
            <div className="w-10 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
            onClick={() => setVisible(3)}
            className="flex justify-between px-3 py-2  cursor-pointer hover:bg-gray-200 transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 p-2 bg-gray-100 rounded-full">
                <MoonIcon />
              </div>
              <div className="text-gray-800 font-bold">
                Display & Accessibility
              </div>
            </div>
            <div className="w-10 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
            onClick={handleLogout}
            className="flex justify-between px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 p-2 bg-gray-100 rounded-full">
                <ArrowLeftOnRectangleIcon />
              </div>
              <div className="text-gray-800 font-bold">Log Out</div>
            </div>
          </div>
        </div>
      )}
      {/** Settings & Privacy **/}
      {visible === 1 && <SettingPrivacy setVisible={setVisible} />}

      {/** Help & Support **/}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}

      {/** Disply Accessibility **/}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
