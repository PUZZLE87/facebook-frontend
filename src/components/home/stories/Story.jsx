const Story = ({ img, profileImg, profileName }) => {
  return (
    <div className="relative flex flex-col cursor-pointer  max-w-[125px] shadow-sm rounded-xl min-w-[90px]  overflow-hidden">
      <img
        className="h-full object-cover hover:scale-110 transition-transform cursor-pointer"
        src={img}
        alt=""
      />
      <div className="absolute w-10 h-10 rounded-full overflow-hidden shrink-0 top-2 shadow-xl shadow-blue-600 right-2">
        <img src={profileImg} alt="" className="h-full object-cover" />
      </div>
      <p className="absolute overflow-hidden bottom-3 left-0 shadow-sm bg-gray-200 text-gray-800 font-semibold rounded-br-xl rounded-tr-xl p-1 pl-2 text-sm w-24 bg-opacity-70 ">
        {profileName}
      </p>
    </div>
  );
};

export default Story;
