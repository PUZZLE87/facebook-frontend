import { useSelector, useDispatch } from "react-redux";
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { clearPostAction } from "../../redux/actions/postAction";

const CreatePost = ({ setVisibleCreatePost }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  return (
    <div className="mt-3 flex justify-center">
      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="w-12 h-12 rounded-full shrink-0 overflow-hidden block">
            <img
              src={user?.userInfo?.picture}
              alt=" "
              className="object-cover h-full w-full"
            />
          </span>
          <div
            onClick={() => {
              dispatch(clearPostAction());
              setVisibleCreatePost(true);
            }}
            className="py-2 px-4 cursor-pointer hover:bg-gray-200 transition-colors grow rounded-full bg-gray-100 text-xl text-gray-600"
          >
            <p>Wha's on your mind, {user?.userInfo?.first_name}</p>
          </div>
        </div>
        <div className="divider my-3"></div>
        <div className="flex justify-evenly items-center">
          <div className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl grow justify-center space-x-2  py-1">
            <VideoCameraIcon className="w-8 text-red-500" />
            <span className="text-gray-800 font-semibold">Live Video</span>
          </div>
          <div className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl grow justify-center space-x-2  py-1">
            <PhotoIcon className="w-8 text-green-500" />
            <span className="text-gray-800 font-semibold">Photo/Video</span>
          </div>
          <div className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl grow justify-center space-x-2  py-1">
            <FaceSmileIcon className="w-8 text-yellow-500" />
            <span className="text-gray-800 font-semibold">
              Feeling/Activity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
