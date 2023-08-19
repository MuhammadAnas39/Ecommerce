import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-3 flex flex-col">
      <h4 className="text-center">All Right Reserved &copy; Ecommerce</h4>
      <div className="text-center">
        <Link
          className="mx-3 text-sm text-gray-300 hover:text-white"
          to="/about"
        >
          About
        </Link>
        <Link
          className="mx-3 text-sm text-gray-300 hover:text-white"
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className="mx-3 text-sm text-gray-300 hover:text-white"
          to="/policy"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
