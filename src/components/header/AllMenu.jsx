import AllMenuItem from "./AllMenuItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { menu, create } from "../../data/allMenu";

const AllMenu = () => {
  return (
    <div className="absolute bg-gray-100 md:right-5 right-0 top-[50px] h-[90vh] w-[320px] md:w-[580px] lg:w-[650px] p-3 shadow-lg rounded-lg">
      <h3 className="text-3xl font-bold mb-3">Menu</h3>
      <div className="overflow-y-scroll scrollbar-thin h-[94%] pr-6 scrollbar-thumb-rounded-md scrollbar-thumb-gray-300">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-center items-center md:space-x-6">
          {/** left side **/}
          <div className="lg:w-[600px] md:w-[550px] w-[270px] bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center relative bg-gray-200 rounded-full px-2">
              <input
                type="text"
                placeholder="Search Menu"
                className="border-none text-gray-700 w-full focus:ring-0 placeholder:text-gray-600 bg-transparent pl-8"
              />
              <MagnifyingGlassIcon className="w-6 absolute text-gray-600" />
            </div>
            <div>
              <div className="font-bold my-2 text-lg">Social</div>
              {menu.slice(0, 6).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">Entertainment</div>
              {menu.slice(6, 9).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">Shopping</div>
              {menu.slice(9, 11).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">Personal</div>
              {menu.slice(11, 15).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">Professional</div>
              {menu.slice(15, 17).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">Community Resources</div>
              {menu.slice(17, 21).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
            <div className="divider mt-1"></div>
            <div>
              <div className="font-bold my-2 text-lg">More from meta</div>
              {menu.slice(21, 23).map((item, index) => (
                <AllMenuItem
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div>
          </div>
          {/** Right side **/}
          <div className="w-[260px] md:w-[300px]">
            <div className="md:fixed md:right-16 md:top-[110px] bg-white p-3 h-fit space-y-1 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">Create</h3>
              {create.map((item, index) => (
                <div
                  key={index}
                  className="flex md:w-[140px] hover:bg-gray-200 transition-colors cursor-pointer items-center h-12 rounded-lg space-x-4"
                >
                  <div className="w-9 h-9 p-2 bg-gray-100 rounded-full">
                    <img
                      src={`/assets/icons/${item.icon}.png`}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <span className="text-md font-semibold text-gray-900">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
