import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 rounded-md p-4 bg-blue-200 mb-7 md:w-2/4 lg:w-1/4">
      <h3 className="text-3xl font-bold text-blue-900">Premium</h3>
      <strong className="text-3xl font-bold text-gray-900 my-5">
        $4.99/mo
      </strong>
      <span className="bg-green-200 text-green-900 rounded-full px-2 py-1 font-semibold">
        10% OFF
      </span>
      <div className="mt-6 text-center">
        <h5 className="text-2xl mb-1 font-semibold text-blue-800">
          Top Features
        </h5>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> 100 Website
        </div>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> 100 GB SSD Storage
        </div>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> Weekly Backups
        </div>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> Unlimited Bandwidth
        </div>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> Free SLL
        </div>
        <div className="flex items-center text-gray-700 mb-1 ps-3">
          <TiTick /> Free Email
        </div>
      </div>
      <button className="mt-4 border-2 border-gray-900 duration-300 cursor-pointer text-gray-900 text-xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-700 hover:border-gray-700 transition w-full">
        BUY NOW
      </button>
    </div>
  );
};

export default WebHostingPlan;
