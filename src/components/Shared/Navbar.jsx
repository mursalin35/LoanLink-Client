import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { TbTransformFilled } from "react-icons/tb";
import {
  MdLightMode,
  MdOutlineDashboard,
  MdOutlineLightMode,
  MdTransferWithinAStation,
} from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaDashcube, FaInfoCircle, FaPhoneAlt, FaUser } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../Logo";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  // LocalStorage / System Theme detect
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  // Initial state set
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // System Theme change auto update
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange); // listen for system changes
    return () => mediaQuery.removeEventListener("change", handleChange); // cleanup
  }, []);

  // Toggle handler (manual switch)
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // Nav Links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="flex items-center gap-1"
          onClick={() => document.activeElement.blur()} // dropdown auto close
        >
          <GoHomeFill /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-loans" onClick={() => document.activeElement.blur()}>
          <TbTransformFilled /> All Loans
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" onClick={() => document.activeElement.blur()}>
          <FaInfoCircle /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={() => document.activeElement.blur()}>
          <FaPhoneAlt /> Contact
        </NavLink>
      </li>
    </>
  );

  // Profile dropdown + toggle button
  const profileLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-1 mt-2"
          onClick={() => document.activeElement.blur()}
        >
          <HiOutlineViewGrid /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className="flex items-center gap-1"
          onClick={() => document.activeElement.blur()}
        >
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className="navbar backdrop-blur-lg
     text-[#1C2B27] dark:text-[#E6F4F1]
      border-white/20 dark:border-white/10
     bg-[#caf9f1] dark:bg-[#1A1C25]

     border shadow-md px-4 md:px-8 h-18 mx-auto  glass-card sticky top-0 z-10"
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-100 rounded-box w-52 
            
            dark:bg-[#232634]
  text-[#1C2B27] dark:text-[#E6F4F1]
            "
          >
            {navLinks}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold w-34 "
        >
          <Logo loanColor={theme === "dark" ? "#B6E04C" : "#232634"} />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-8">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {/* theme toggle  */}
        <button
          onClick={() => handleTheme(theme !== "dark")}
          className="text-[1.5rem] p-2 cursor-pointer "
        >
          {theme === "dark" ? (
            <MdLightMode className="text-[#B6E04C]" />
          ) : (
            <MdOutlineLightMode />
          )}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full overflow-hidden">
                <img
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/?size=100&id=0prbldgxVuTl&format=png&color=000000"
                  }
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content min-w-48 w-auto mt-3 z-50 p-2 shadow  rounded-box 
              
               bg-white dark:bg-[#232634]
    text-[#1C2B27] dark:text-[#E6F4F1]
              "
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              {profileLinks}
              <li>
                <button
                  onClick={logOut}
                  className="btn btm btn-sm mt-3  border-none hover:opacity-90
                  
                   text-white
  bg-[#1F4F45] dark:bg-[#6FBF73]
                  "
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btm btn-sm rounded-full  border-none hover:opacity-90
            
             text-white
  bg-[#1F4F45] dark:bg-[#6FBF73]
            "
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
