import {
  PhotoIcon,
  TagIcon,
  MapPinIcon,
  MicrophoneIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

const AddToYourPost = ({ setShowPostImg }) => {
  return (
    <div className="px-4 ">
      <div className="border-2 px-2 py-1 rounded-lg border-gray-200 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-lg grow text-gray-700 font-semibold">
          Add to your post
        </p>
        <div className="flex items-center space-y-2 sm:space-y-0">
          <PhotoIcon
            onClick={() => setShowPostImg(true)}
            className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-green-600"
          />
          <TagIcon className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-blue-600" />
          <FaceSmileIcon className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-yellow-600" />
          <MapPinIcon className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-red-600" />
          <MicrophoneIcon className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-rose-500" />
          <EllipsisHorizontalIcon className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default AddToYourPost;
