import {
  ArrowLeftIcon,
  Cog8ToothIcon,
  LockClosedIcon,
  KeyIcon,
  ListBulletIcon,
  NewspaperIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const SettingPrivacy = ({ setVisible }) => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-start space-x-4">
        <div onClick={() => setVisible(0)} className="w-9 h-9  rounded-full p-2 hover:text-blue-500 transition-colors cursor-pointer hover:bg-gray-200">
          <ArrowLeftIcon />
        </div>
        <div className="text-2xl text-gray-800 font-bold">
          Settings & Privacy
        </div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-1 bg-gray-100 rounded-full  ">
          <Cog8ToothIcon />
        </div>
        <div className="text-lg">Settings</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <KeyIcon />
        </div>
        <div className="text-lg">Privacy Checkup</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <LockClosedIcon />
        </div>
        <div className="text-lg">Privacy Shortcuts</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <ListBulletIcon />
        </div>
        <div className="text-lg">Activity Log</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <NewspaperIcon />
        </div>
        <div className="text-lg">News Feed Prefrences</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <GlobeAltIcon />
        </div>
        <div className="text-lg">Language</div>
      </div>

    </div>
  );
};

export default SettingPrivacy;
