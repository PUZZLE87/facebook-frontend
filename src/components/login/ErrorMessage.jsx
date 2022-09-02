const ErrorMessage = ({ message, arrowDir, position }) => {
  let arrowStyle = "";
  let locationStyle = "";

  switch (arrowDir) {
    case "down":
      arrowStyle = "top-full let-3";
      break;
    case "up":
      arrowStyle = "bottom-full left-3 rotate-180";
      break;
    case "left":
      arrowStyle = "-left-4 rotate-90  top-1/2 -translate-y-1/2";
      break;
    case "left":
      arrowStyle = "-right-4 -rotate-90  top-1/2 -translate-y-1/2";
      break;
    default:
      arrowStyle = "";
      break;
  }

  switch (position) {
    case "left":
      locationStyle = "absolute w-80 top-0 right-full mr-4";
      arrowStyle = "left-[98%] -rotate-90 top-3";
      break;
    case "right":
      locationStyle = "absolute w-80 top-0 left-full ml-4";
      arrowStyle = "right-[98%] rotate-90 top-3";
      break;
    default:
      locationStyle = "relative";
      break;
  }


  return (
    <div className={`${locationStyle} shadow-lg shadow-red-600/50 rounded-lg text-gray-100 text-md lg:w-88 p-4 bg-red-600`}>
      {message}
      <div className={`${arrowStyle} shadow-xl shadow-red-600/50 w-0 h-0 absolute border-l-[12px] border-l-transparent border-t-[14px] border-t-red-600 border-r-[12px] border-r-transparent`}></div>
    </div>
  );
};

export default ErrorMessage;
