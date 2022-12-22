import React from "react";
const reactsIcons = [
  { name: "like", image: "/assets/reacts/like.gif" },
  { name: "love", image: "/assets/reacts/love.gif" },
  { name: "haha", image: "/assets/reacts/haha.gif" },
  { name: "wow", image: "/assets/reacts/wow.gif" },
  { name: "sad", image: "/assets/reacts/sad.gif" },
  { name: "angry", image: "/assets/reacts/angry.gif" },
];

const ReactsPopup = ({ visible, setVisible }) => {
  return (
    <>
      {visible && (
        <div className="flex space-x-2 bg-white shadow-md p-2 rounded-full border border-gray-100 ">
          {reactsIcons.map((reactIcon, i) => (
            <div key={i} className="w-9 hover:scale-150 transition-transform">
              <img src={reactIcon.image} alt={reactIcon.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactsPopup;
