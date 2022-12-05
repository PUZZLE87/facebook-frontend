import { Link } from "react-router-dom";

const LeftLink = ({ img, text, notification = "" }) => {
  return (
    <Link
      to="/"
      className="p-2 bg-gray-300 rounded-full w-12 h-12 xl:w-auto xl:h-auto space-x-2 flex items-center hover:bg-gray-400 xl:hover:bg-gray-300 xl:rounded-lg xl:bg-transparent  transition-colors "
    >
      <img src={`/assets/left/${img}.png`} alt="" />
      <div className="leading-4 hidden xl:block">
        <p className="text-md font-semibold">{text}</p>
        {notification && (
          <p className="text-sm text-blue-600">
            <span className="w-2 h-2 inline-block rounded-full bg-blue-500 mr-1"></span>
            {notification}
          </p>
        )}
      </div>
    </Link>
  );
};

export default LeftLink;
