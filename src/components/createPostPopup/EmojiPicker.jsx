import Picker from "emoji-picker-react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const EmojiPicker = ({ textRef, setText, text }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  useClickOutside(emojiRef, () => setShowEmojiPicker(false));

  return (
    <div ref={emojiRef} className="relative inline-block ">
      <div
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className={`${
          showEmojiPicker ? "text-blue-500" : "text-gray-400"
        } w-7 cursor-pointer hover:text-blue-600  transition-colors`}
      >
        <FaceSmileIcon />
      </div>
      {showEmojiPicker && (
        <div className="absolute z-40 top-full -translate-x-[90%]  ">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
