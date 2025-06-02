import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "/public/logo2.png";

const SideBar = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <aside className="w-72 bg-primary text-white flex flex-col sticky top-0 h- shadow-2xl">
      <div className="p-6 border-b border-[#B84E4F] flex items-center justify-center ">
        {/* <Link to="/" className="cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <img src={logo} alt="logo" className="w-40 h-36 object-contain" />
        </Link> */}
        <h1 className="text-white text-2xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-200">Roshan Vastralaya</h1>
      </div>

      <nav className="flex flex-col flex-grow p-6 space-y-8">
        <>
          <Link
            to="/"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/")
              ? "bg-[white] text-primary shadow-lg shadow-blue-500/20"
              : "text-white hover:bg-[#B84E4F] hover:text-white hover:translate-x-1"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span className="font-medium">All Products</span>
          </Link>

          <Link
            to="/addproducts"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/addproducts")
              ? "bg-[white] text-primary shadow-lg shadow-blue-500/20"
              : "text-white hover:bg-[#B84E4F] hover:text-white hover:translate-x-1"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Add Product</span>
          </Link>

          <Link
            to="/getcategory"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/getcategory")
              ? "bg-[white] text-primary shadow-lg shadow-blue-500/20"
              : "text-white hover:bg-[#B84E4F] hover:text-white hover:translate-x-1"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Category</span>
          </Link>

          <Link
            to="/gallery"
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/gallery")
              ? "bg-[white] text-primary shadow-lg shadow-blue-500/20"
              : "text-white hover:bg-[#B84E4F] hover:text-white hover:translate-x-1"
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Gallery</span>
          </Link>

          <div className="mt-auto pt-6 border-t border-primaryHover">
            {/* <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm text-white mb-3">
              <div className="text-sm font-semibold">{loggedInUser.fullname}</div>
              <div className="text-xs text-[#f1c1c1]">Administrator</div>
            </div> */}

     <Link
  to="/logout"
  className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
    isActive("/logout")
      ? "bg-gradient-to-r from-[#A5383A] to-[#C84748] text-white shadow-lg shadow-[#A5383A]/30"
      : "bg-gradient-to-r from-[#A5383A]/90 to-[#C84748]/90 hover:from-[#8E2E31] hover:to-[#B73C3C] text-white hover:shadow-lg hover:shadow-[#A5383A]/30 transform hover:scale-[1.02]"
  }`}
>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium ">Logout</span>
            </Link>
          </div>
        </>
      </nav>
    </aside>
  );
};

export default SideBar;
