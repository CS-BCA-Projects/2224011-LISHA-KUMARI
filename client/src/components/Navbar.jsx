import React, { useState, useContext , useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { FaUser } from "react-icons/fa";

const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { isLoggedin, userData, setIsLoggedin, setUserData } = useContext(AppContent);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null)


  useEffect(() => {

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setDropdownOpen(false)
      }
    }


    document.addEventListener('click' , handleOutsideClick)
    return () => document.removeEventListener('click' , handleOutsideClick)

  } , [])

  const logout = () => {
    setIsLoggedin(false);
    setUserData(null);
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <header className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-['Pacifico'] text-indigo-600">LoFo</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <a href="/" className="hover:text-indigo-600">Home</a>
          <a href="/report" className="hover:text-indigo-600">Report Item</a>
          <a href="/view-reported-items" className="hover:text-indigo-600">View Reported Items</a>
          <a href="/browse-lost-found" className="hover:text-indigo-600">Browse Lost & Found</a>
          <a href="/contact" className="hover:text-indigo-600">Contact</a>
          <a href="/notifications" className="hover:text-indigo-600">Notifications</a>

          {isAdmin && (
            <>
              <a href="/admin-dashboard" className="hover:text-indigo-600">Admin Dashboard</a>
              <a href="/manage-reports" className="hover:text-indigo-600">Manage Reports</a>
              <a href="/manage-users" className="hover:text-indigo-600">Manage Users</a>
            </>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative flex items-center cursor-pointer gap-4" ref={dropdownRef}>
          {isLoggedin ? (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
              >
                <FaUser className="text-indigo-600 text-3xl" />
                <h1 className="text-gray-700">{userData.name}</h1>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg">
              Sign up
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
