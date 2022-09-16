import { PlusIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { stories } from "../../../data/home";
import useScreenSize from "../../../hooks/screenSize";
import Story from "./Story";

const Stories = () => {
  const { isMD, isSM } = useScreenSize();
  const stoiresCount = isMD ? 5 : isSM ? 4 : 3;
  return (
    <div className="flex justify-center">
      <div className="inline-flex p-2 h-56 relative scale-90 sm:scale-100 space-x-3 justify-center">
        <div className="relative flex flex-col cursor-pointer max-w-[125px] min-w-[90px] shadow-sm rounded-xl overflow-hidden">
          <div className="h-[70%] overflow-hidden">
            <img
              src="/assets/images/profile.png"
              alt=""
              className="brightness-75 object-cover h-full"
            />
          </div>
          <p className="bg-white h-[30%] text-gray-800 text-sm flex justify-center items-center ">
            Create Sotry
          </p>
          <div className="absolute top-[70%] left-1/2 border-white border-4 bg-blue-500 p-1 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <PlusIcon className="w-6 text-white" />
          </div>
        </div>

        {stories.slice(0, stoiresCount).map((item, index) => (
          <Story
            key={index}
            img={item.image}
            profileImg={item.profile_picture}
            profileName={item.profile_name}
          />
        ))}

        <div className="p-2 hover:bg-gray-200 cursor-pointer transition-colors bg-white absolute rounded-full shadow-md shrink-0 top-1/2 -translate-y-1/2 right-0">
          <ArrowRightIcon className="w-6 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Stories;
