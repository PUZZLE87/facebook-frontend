import { useSelector } from "react-redux";
import {
  PaperClipIcon,
  BookmarkIcon,
  BellAlertIcon,
  BellSlashIcon,
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  LockClosedIcon,
  PencilIcon,
  LanguageIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
const PostMenu = ({ post }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const isUserPost =
    user?.username === post?.user[0]?.username || post?.user?.username;
  return (
    <div className="bg-white w-[300px] space-y-1 overflow-hidden p-3 rounded-lg shadow-xl">
      {isUserPost && (
        // Pin post
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <PaperClipIcon className="w-7 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">Pin Post</p>
          </div>
        </div>
      )}
      {/* save post */}
      <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
        <BookmarkIcon className="w-6 text-gray-500" />
        <div className="leading-4">
          <p className="text-gray-800 text-md font-semibold">Save Post</p>
          <span className="text-sm">Add this to your save items.</span>
        </div>
      </div>
      <div className="divider h-[2px]"></div>
      {/* edit post */}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <PencilIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">Edit Post</p>
          </div>
        </div>
      )}
      {/* Turn on notification */}
      {!isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <BellAlertIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Turn on notification for this post
            </p>
          </div>
        </div>
      )}
      {post?.images?.length > 0 && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <ArrowDownTrayIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">Download</p>
          </div>
        </div>
      )}
      {post?.images?.length > 0 && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <ArrowsPointingOutIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Enter Fullscreen
            </p>
          </div>
        </div>
      )}
      {/* Edit audience */}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <LockClosedIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">Edit audience</p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <BellSlashIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Turn off notification for this post
            </p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <LanguageIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Turn off translations
            </p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <CalendarDaysIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">Edit date</p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <ArrowPathIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Refresh share atachment
            </p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <ArchiveBoxIcon className="w-6 text-gray-500" />
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Move to archive
            </p>
          </div>
        </div>
      )}
      {isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <TrashIcon className="w-6 text-gray-500" />
          <div className="leading-4">
            <p className="text-gray-800 text-md font-semibold">Move to trash</p>
            <span className="text-xs">
              Item in your trash are deleted after 30 days
            </span>
          </div>
        </div>
      )}
      {!isUserPost && <div className="divider h-[2px]"></div>}
      {!isUserPost && (
        <div className="flex space-x-2 p-2 hover:bg-gray-200 cursor-pointer transition-colors rounded-lg  items-center">
          <ChatBubbleLeftEllipsisIcon className="w-6 text-gray-500" />
          <div className="leading-4">
            <p className="text-gray-800 text-md font-semibold">Report post</p>
            <span className="text-sm">I'm concerned about this post</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
