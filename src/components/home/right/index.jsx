import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import Contact from "./Contact";
import { useSelector } from "react-redux";

const HomeRight = () => {
  const user = useSelector((state) => state?.user);

  return (
    <div>
      <div className="p-3 w-60 hidden lg:block fixed right-0 top-12">
        <p className="p-1 text-lg text-gray-700 font-semibold">Sponsored</p>
        <div className="divider bg-gray-300"></div>
        <div className="flex justify-between p-1 text-gray-700 items-center">
          <p className="grow font-semibold ">Contacts</p>
          <div className="flex space-x-2">
            <VideoCameraIcon className="w-5 cursor-pointer" />
            <MagnifyingGlassIcon className="w-5 cursor-pointer" />
            <EllipsisHorizontalIcon className="w-5 cursor-pointer" />
          </div>
        </div>
        <div className="p-1 space-y-1">
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
