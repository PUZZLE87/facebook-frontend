import {
  ArrowLeftIcon,
  MoonIcon,
  ArrowDownOnSquareIcon,
  ChevronRightIcon,
  CalculatorIcon
} from "@heroicons/react/24/solid";



const DisplayAccessibility = ({ setVisible }) => {
  return (
    <div>
      <div className="flex items-center justify-start space-x-4 mb-4">
        <div
          onClick={() => setVisible(0)}
          className="w-9 h-9  rounded-full p-2 hover:text-blue-500 transition-colors cursor-pointer hover:bg-gray-200"
        >
          <ArrowLeftIcon />
        </div>
        <div className="text-2xl text-gray-800 font-bold">
          Display & Accessibility
        </div>
      </div>
      <div>
        <div className="flex space-x-3  ">
          <div className="w-9 h-9 bg-gray-100 p-2 shrink-0 rounded-full">
            <MoonIcon />
          </div>
          <div className="leading-4">
            <p className="text-gray-900 font-semibold">Dark Mode</p>
            <p className="text-sm text-gray-600 leading-4">
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </p>
            <div className="flex flex-col items-stretch mt-2 space-y-1 ">
              <label className="p-2 flex items-center justify-between tex-gray-900 font-bold text-lg cursor-pointer hover:bg-gray-200  rounded-lg transition-colors ">
                <span>On</span>
                <input type="radio" name="darkMode" />
              </label>
              <label className="p-2 flex items-center justify-between tex-gray-900 font-bold text-lg cursor-pointer hover:bg-gray-200  rounded-lg transition-colors ">
                <span>Off</span>
                <input type="radio" name="darkMode" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-3  ">
          <div className="w-9 h-9 bg-gray-100 p-2 shrink-0 rounded-full">
            <ArrowDownOnSquareIcon />
          </div>
          <div className="leading-4">
            <p className="text-gray-900 font-semibold">Compact mode</p>
            <p className="text-sm text-gray-600 leading-4">
              Make your font size smaller so more content can fit on the screen.
            </p>
            <div className="flex flex-col items-stretch mt-2 space-y-1 ">
              <label className="p-2 flex items-center justify-between tex-gray-900 font-bold text-lg cursor-pointer hover:bg-gray-200  rounded-lg transition-colors ">
                <span>On</span>
                <input type="radio" name="compactMode" />
              </label>
              <label className="p-2 flex items-center justify-between tex-gray-900 font-bold text-lg cursor-pointer hover:bg-gray-200  rounded-lg transition-colors ">
                <span>Off</span>
                <input type="radio" name="compactMode" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-1  py-2  cursor-pointer hover:bg-gray-200 transition-colors rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 p-2 bg-gray-100 rounded-full">
            <CalculatorIcon />
          </div>
          <div className="text-gray-800 font-bold">
            Keyboard
          </div>
        </div>
        <div className="w-10 p-1 text-gray-500">
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default DisplayAccessibility;
