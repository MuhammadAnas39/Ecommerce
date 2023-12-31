import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminMenu = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-center bg-gray-300">
        <p className="font-semibold text-lg">Admin Dashboard</p>
      </div>
      <Link
        to="/dashboard/create-category"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/create-category" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        Create Category
      </Link>
      <Link
        to="/dashboard/create-product"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/create-product" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        Create Product
      </Link>
      <Link
        to="/dashboard/products"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/products" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        All Products
      </Link>
      <Link
        to="/dashboard/all-orders"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/all-orders" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        All Orders
      </Link>
      <Link
        to="/dashboard/all-users"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white w-full p-2 rounded-sm text-sm ${
          location.pathname === "/dashboard/all-users" &&
          "text-gray-300 bg-gray-800 border-2 border-gray-500"
        }`}
      >
        Users
      </Link>
    </div>
  );
};

export default AdminMenu;
