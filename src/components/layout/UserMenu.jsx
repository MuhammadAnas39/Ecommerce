import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserMenu = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-center bg-gray-300">
        <p className="font-semibold text-lg">User Dashboard</p>
      </div>
      <Link
        to="/dashboard/user/profile"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/user/profile" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        Profile
      </Link>
      <Link
        to="/dashboard/user/orders"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/user/orders" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        Order
      </Link>
    </div>
  );
};

export default UserMenu;
