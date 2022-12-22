import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  GlobeAsiaAustraliaIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const Post = React.forwardRef(({ post }, ref) => {
  const [reactsVisible, setReactsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));
  return (
    <div ref={ref} className="bg-white rounded-lg shadow-md">
      <div className="p-3 flex justify-between items-center">
        <Link
          to={`/profile/${post?.user[0]?.username || post?.user?.username}`}
          className="flex space-x-2 items-center text-gray-600 font-semibold"
        >
          <img
            src={post?.user[0]?.picture || post?.user?.picture}
            alt=""
            className="rounded-full shrink-0 h-12 w-12 object-cover"
          />
          <div className="flex flex-col leading-4">
            <span>
              {post?.user[0]?.first_name || post?.user?.first_name}{" "}
              {post?.user[0]?.last_name || post?.user?.last_name}
            </span>
            <span className="flex items-center justify-start">
              <Moment className="text-sm" fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              <GlobeAsiaAustraliaIcon className="w-4" />
            </span>
          </div>
        </Link>
        <div ref={menuRef} className="relative">
          <div onClick={() => setShowMenu((prev) => !prev)}>
            <EllipsisHorizontalIcon className="w-10 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer rounded-full p-1" />
          </div>
          {showMenu && (
            <div className="absolute top-8 right-6 z-20">
              <PostMenu post={post} />
            </div>
          )}
        </div>
      </div>
      {/* post content */}
      {post?.background ? (
        <div
          style={{ backgroundImage: `url("${post?.background}")` }}
          className="xl:h-[600px] md:h-[400px] sm:h-[350px] h-[300px] bg-cover bg-center flex justify-center items-center"
        >
          <span
            style={{ backgroundImage: `url("${post?.background}")` }}
            className="text-xl relative break-all rounded-lg overflow-y-scroll scrollbar-none inline-block w-auto max-w-[85%] max-h-[60%] bg-gray-100 bg-blend-overlay bg-opacity-50"
          >
            <span className="h-full  backdrop-blur-sm select-none backdrop-opacity-70 font-semibold text-gray-700 p-4 block">
              {post?.text}
            </span>
          </span>
        </div>
      ) : (
        <>
          <div className="text-lg select-none text-gray-700 px-4 py-2 border-y-gray-100 border-y">
            {post?.text}
          </div>
          {post?.images?.length > 0 && (
            <>
              <div className="xl:h-[600px] md:h-[400px] sm:h-[350px] h-[300px] overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-100 relative bg-gray-100">
                <div>
                  {post?.images.map((img, index) => (
                    <div
                      key={index}
                      className="relatvie xl:h-[600px] md:h-[400px] sm:h-[350px] h-[300px] w-full overflow-hidden"
                    >
                      <div className="w-full h-full lazyImage">
                        <LazyLoadImage src={img?.url} effect="blur" alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* post info */}
      <div className="flex justify-between py-2 px-4 text-gray-700 text-md">
        <div className="flex space-x-1">
          <div>React Icons</div>
          <div>4</div>
        </div>
        <div className="flex space-x-5">
          <div>14 comments</div>
          <div>5 share</div>
        </div>
      </div>
      {/* post actions */}
      <div className="text-gray-600 border-y border-gray-100 p-2 font-semibold flex justify-center">
        <div
          onMouseOver={() => {
            setTimeout(() => {
              setReactsVisible(true);
            }, 100);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setReactsVisible(false);
            }, 500);
          }}
          className="flex justify-center relative items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors grow"
        >
          <img src="/assets/reacts/like.svg" alt="" className="w-5" />
          <span>Like</span>
          <div className="absolute bottom-full left-1">
            <ReactsPopup
              visible={reactsVisible}
              setVisible={setReactsVisible}
            />
          </div>
        </div>
        <div className="flex  justify-center items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors grow">
          <ChatBubbleLeftIcon className="w-5 text-gray-600" />
          <span>Comment</span>
        </div>
        <div className="flex py-3 justify-center items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors grow">
          <ShareIcon className="w-5 text-gray-600" />
          <span>Share</span>
        </div>
      </div>
      {/* comment */}
      <div className="py-2 px-4">
        <CreateComment />
      </div>
    </div>
  );
});

export default Post;
