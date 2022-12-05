import {
  XMarkIcon,
  GlobeAsiaAustraliaIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import BackgroundPost from "./BackgroundPost";
import EmojiPicker from "./EmojiPicker";
import AddToYourPost from "./AddToYourPost";
import PulseLoader from "../ui/PulseLoader";
import { clearPostAction, postAction } from "../../redux/actions/postAction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PostImage from "./PostImage";
import dataurlToBlob from "dataurl-to-blob";
import { useNavigate } from "react-router-dom";

const CreatePostPopup = ({ setVisibleCreatePost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state?.user);
  const post = useSelector((state) => state?.post);
  const [bgImage, setBgImage] = useState(null);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [showPostImg, setShowPostImg] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (
      (post?.postInfo?.images?.length > 0 ||
        post?.postInfo?.background ||
        post?.postInfo?.text) &&
      !post?.errorMessage
    ) {
      setVisibleCreatePost(false);
      navigate("/");
    }
  }, [
    post?.postInfo?.images,
    post?.postInfo?.background,
    post?.errorMessage,
    post?.postInfo?.text,
  ]);

  const sendPost = () => {
    if (bgImage) {
      dispatch(postAction(axiosPrivate, { text, background: bgImage }));
    } else if (images?.length) {
      const postImages = images.map((img) => dataurlToBlob(img));
      const path = `${user?.userInfo?.username}/post images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((img) => {
        formData.append("file", img);
      });
      dispatch(postAction(axiosPrivate, { text, path }, formData));
    } else if (text) {
      dispatch(postAction(axiosPrivate, { text }));
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-90 p-8 z-40 flex scrollbar-none overflow-y-scroll">
      <div className="w-[70%] relative min-w-[320px] max-w-[600px] m-auto mt-20 bg-white  rounded-lg shadow-lg overflow-hidden">
        <div className="space-y-3">
          <div className="flex items-center pt-2 px-4">
            <h1 className="grow text-center text-2xl font-semibold text-gray-700">
              Create Post
            </h1>
            <span
              onClick={() => setVisibleCreatePost(false)}
              className="w-9 h-9 p-2 bg-gray-200 text-gray-600 cursor-pointer hover:text-red-600 rounded-full shrink-0 transition-colors hover:bg-gray-300"
            >
              <XMarkIcon />
            </span>
          </div>
          <div className="divider h-[2px]"></div>
          <div className="px-4 mt-2 flex space-x-2  items-center">
            <img
              src={user?.userInfo?.picture}
              className="w-12 h-12 border-[1px] border-gray-200 shrink-0 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col text-gray-700">
              <span className="font-semibold text-lg">
                {user?.userInfo?.first_name} {user?.userInfo?.last_name}
              </span>
              <span className="flex select-none space-x-1 bg-gray-200 cursor-pointer px-2 rounded-lg">
                <GlobeAsiaAustraliaIcon className="w-4" />
                <span>Public</span>
                <ArrowDownCircleIcon className="w-4" />
              </span>
            </div>
          </div>{" "}
          <div className="relative px-4">
            <textarea
              className={`w-full bg-gray-100 rounded-md  pl-3 pr-10 py-3 h-20 resize-none   overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg text-lg border-none text-gray-700 focus:ring-0`}
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${user?.userInfo?.first_name}`}
            />
            <span className="absolute right-6 bottom-1">
              <EmojiPicker text={text} setText={setText} textRef={textRef} />
            </span>
          </div>
          <div>
            {showPostImg ? (
              <PostImage
                setShowPostImg={setShowPostImg}
                images={images}
                setImages={setImages}
              />
            ) : (
              <BackgroundPost
                text={text}
                bgImage={bgImage}
                setBgImage={setBgImage}
              />
            )}
          </div>
          <AddToYourPost setShowPostImg={setShowPostImg} />
          <div className="px-4 pb-4">
            <button
              disabled={
                post?.isLoading || (!text && !bgImage && !images?.length > 0)
              }
              onClick={sendPost}
              className="bg-blue-600 w-full p-3 rounded-lg hover:shadow-none transition-colors hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 shadow-blue-500 disabled:hover:bg-blue-300 shadow-2xl font-semibold text-gray-100"
            >
              {post?.isLoading ? (
                <PulseLoader isLoading={true} color="#fff" />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
        <div
          className={`${
            post?.errorMessage ? "translate-x-0 " : "-translate-x-full "
          }bg-gray-300 transition-transform absolute inset-0 bg-opacity-90 flex items-center justify-center space-x-2`}
        >
          <p className="text-xl text-red-600">{post?.errorMessage}</p>
          <button
            onClick={() => dispatch(clearPostAction())}
            className="bg-blue-600 p-3 text-gray-100 cursor-pointer hover:bg-blue-700 transition-colors  rounded-lg"
          >
            Try again?
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
