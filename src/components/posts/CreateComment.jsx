import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  CameraIcon,
  TagIcon,
  GifIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EmojiPicker from "../createPostPopup/EmojiPicker";

const CreateComment = () => {
  const user = useSelector((state) => state?.user?.userInfo);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [commentImg, setCommentImg] = useState("");
  const imgRef = useRef(null);

  const handleIamge = (e) => {
    let img = e.target.files[0];
    let type = img.type.split("/")[1];
    if (!["jpeg", "png", "webp", "gif"].includes(type)) {
      setErrorMsg(
        `{${img.name} format is unsupported! only jpeg, png, webp, git are allowed}`
      );
      return;
    } else if (img.size > 1024 * 1024 * 3) {
      setErrorMsg(`{${img.name} size is too large max 3mb allowed}`);
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setCommentImg(readerEvent.target.result);
      };
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center space-x-2">
        <img src={user?.picture} alt="" className="w-8 h-8 rounded-full" />
        <div className="grow flex relative justify-between bg-gray-100 rounded-full px-3 items-center">
          <input
            className="bg-transparent border-none focus:border-none focus:ring-0 text-gray-700 grow"
            placeholder="Write a comment"
            type="text"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-gray-400 relative flex space-x-1">
            <EmojiPicker
              position="bottom"
              text={text}
              setText={setText}
              textRef={textRef}
            />
            <CameraIcon
              className="w-6 hover:text-blue-500 cursor-pointer transition-colors"
              onClick={() => imgRef.current.click()}
            />
            <input
              type="file"
              hidden
              ref={imgRef}
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleIamge}
            />
            <GifIcon className="w-6 hover:text-blue-500 cursor-pointer transition-colors" />
            <TagIcon className="w-6 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
          {errorMsg && (
            <div
              className={`${
                errorMsg ? "translate-x-0 " : "-translate-x-full "
              } transition-transform absolute px-3 bg-blue-200 items-center rounded-full inset-0 bg-opacity-90 flex justify-between`}
            >
              <span className="text-red-500 text-sm leading-4 grow-1 mr-2">
                {errorMsg}
              </span>
              <button
                className="bg-blue-500 text-sm text-gray-100 px-3 py-1 grow-0 rounded-lg  shrink-0"
                onClick={() => setErrorMsg("")}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      {commentImg && (
        <div className="relative inline-block mt-5">
          <img
            src={commentImg}
            alt=""
            className="w-16 h-16 object-cover rounded-md"
          />
          <div
            onClick={() => setCommentImg("")}
            className="absolute rounded-full text-white bg-gray-300 cursor-pointer hover:text-red-500 transition-colors top-1 right-1"
          >
            <XMarkIcon className="w-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
