import { ArrowLeftIcon, QuestionMarkCircleIcon, InformationCircleIcon, EnvelopeIcon } from "@heroicons/react/24/solid"
const HelpSupport = ({ setVisible }) => {
  return (
    <div className="p-3">

      <div className="flex items-center justify-start space-x-4">
        <div onClick={() => setVisible(0)} className="w-9 h-9  rounded-full p-2 hover:text-blue-500 transition-colors cursor-pointer hover:bg-gray-200">
          <ArrowLeftIcon />
        </div>
        <div className="text-2xl text-gray-800 font-bold">
          Settings & Privacy
        </div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <QuestionMarkCircleIcon />
        </div>
        <div className="text-lg">Help Center</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <EnvelopeIcon />
        </div>
        <div className="text-lg">Support Inbox</div>
      </div>
      <div className="flex items-center space-x-2 font-semibold text-gray-800 p-2  hover:bg-gray-200 transition-colors rounded-lg cursor-pointer">
        <div className="w-9 h-9 p-2 bg-gray-100 rounded-full  ">
          <InformationCircleIcon />
        </div>
        <div className="text-lg">Report a Problem</div>
      </div>
    </div>
  )
}


export default HelpSupport;
