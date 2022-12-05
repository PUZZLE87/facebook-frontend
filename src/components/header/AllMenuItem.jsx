const AllMenuItem = ({ name, description, icon }) => {
  return (
    <div className="flex space-x-2 p-1  transition-colors cursor-pointer hover:bg-gray-200 rounded-lg h-[72px]">
      <img
        src={`/assets/left/${icon}.png`}
        alt=""
        className="object-contain w-9"
      />
      <div className="flex flex-col">
        <span className="text-md ">{name}</span>
        <span className="text-[0.8rem] text-gray-500 overflow-hidden">
          {description}
        </span>
      </div>
    </div>
  );
};

export default AllMenuItem;
