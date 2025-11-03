import React from "react";
import { Notebook } from "lucide-react";

function Header() {
  return (
    <div className="flex flex-col fixed top-0 left-0 w-full z-50  sm:flex-row items-center justify-around bg-conic-500 from-gray-50 to-orange-100   p-4 border-b border-orange-300 ">
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <div className="bg-orange-900 p-2 rounded-full ">
          <Notebook className="text-gray-200 w-7 h-7 " />
        </div>
        <h1 className="text-3xl  font-bold text-yellow-700  text-center ">
          Task Tracker
        </h1>
      </div>
      <p className="text-gray-900 text-md text-center italic justify-center">
        “Your goals are built one task at a time.”
      </p>
    </div>
  );
}

export default Header;
