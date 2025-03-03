import { Badge } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingCart, FaSign, FaSignInAlt, FaStore } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

function Navbar() {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {cart} = useSelector(state => state.carts);
  const {user} = useSelector(state => state.auth);

  return (
    <div className="h-[60px] bg-[linear-gradient(30deg,#021042,#072078)] text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="">E-shop</span>
        </Link>
        <ul
          className={`flex sm:gap-5 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 w-full sm:w-fit sm:flex-row flex-col px-4 sm:px-0 
            bg-[linear-gradient(30deg,#021042,#072078)]  
            sm:h-fit sm:bg-none sm:shadow-none shadow-md transition-all duration-150 ease-in-out top-[60px]
            sm:flex ${
              navbarOpen
                ? "opacity-100 scale-y-100 translate-y-0 h-fit pb-5"
                : "opacity-0 scale-y-0 -translate-y-5 h-0 overflow-hidden"
            } sm:opacity-100 sm:scale-100 sm:h-auto sm:overflow-visible sm:translate-y-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/"
                  ? "text-white font-semibold"
                  : "text-gray-100 opacity-75"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/products"
                  ? "text-white font-semibold"
                  : "text-gray-100 opacity-75"
              }`}
              to="/products"
            >
              Products
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/about"
                  ? "text-white font-semibold"
                  : "text-gray-100 opacity-75"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/contact"
                  ? "text-white font-semibold"
                  : "text-gray-100 opacity-75"
              }`}
              to="/contact"
            >
              Contact
            </Link>
          </li>

          <li className="font-[500] transition-all duration-150">
            <Link
              className={`${
                path === "/cart"
                  ? "text-white font-semibold"
                  : "text-gray-100 opacity-75"
              }`}
              to="/cart"
            >
              <Badge
                showZero
                badgeContent={cart?.length || 0}
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <FaShoppingCart size={25} />
              </Badge>
            </Link>
          </li>

          {user && user.id ? (
            <li className="font-[500] transition-all duration-150 mx-2">
              <UserMenu  />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
            <Link
              className="flex items-center space-x-2 px-4 py-[4px] bg-gradient-to-r from-purple-600 to-red-500
              text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition
              duration-300 ease-in-out transform"
              to="/login"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          </li>
          )}
          
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
