import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { TbTransformFilled } from "react-icons/tb";
import { MdTransferWithinAStation } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

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
        <NavLink
          to="/all-loans"
          onClick={() => document.activeElement.blur()}
        >
          <TbTransformFilled /> All Loans
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          onClick={() => document.activeElement.blur()}
        >
          <MdTransferWithinAStation /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={() => document.activeElement.blur()}
        >
          <MdTransferWithinAStation /> Contact
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
          className="flex items-center gap-1"
          onClick={() => document.activeElement.blur()}
        >
          <FaUser /> Dashboard
        </NavLink>
      </li>

      {/* Theme toggle */}
      <div className="flex items-center gap-2 mt-3 px-2">
        <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
        <input
          type="checkbox"
          className="toggle"
          checked={theme === "dark"}
          onChange={(e) => handleTheme(e.target.checked)}
        />
      </div>
    </>
  );

  return (
    <div className="navbar backdrop-blur-lg border border-white/20 shadow-md px-4 md:px-8 h-18 mx-auto glass-card bg-[#E8FAF7] dark:bg-[#1a1c25] sticky top-0 z-10">
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
            className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold w-34">
          <img
            src="https://i.ibb.co.com/0yDRJgjJ/finans-logo.png"
            alt="FinEase Logo"
            className="h-10 "
          />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-8">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
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
              className="menu menu-sm dropdown-content min-w-48 w-auto mt-3 z-50 p-2 shadow bg-base-100 rounded-box"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              {profileLinks}
              <li>
                <button
                  onClick={logOut}
                  className="btn btn-sm mt-3 text-white border-none bg-gradient-to-r from-[#632ee3] to-[#00b8b0] hover:opacity-90"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn text-[#555565] btn-sm rounded-full text-white border-none bg-gradient-to-r from-[#632ee3] to-[#00b8b0] hover:opacity-90"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
