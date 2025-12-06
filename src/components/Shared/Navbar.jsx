import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);

  const navLinksBeforeLogin = (
    <>
      <NavLink to="/" className="nav-item">Home</NavLink>
      <NavLink to="/all-loans" className="nav-item">All-Loans</NavLink>
      <NavLink to="/about" className="nav-item">About Us</NavLink>
      <NavLink to="/contact" className="nav-item">Contact</NavLink>
      <NavLink to="/auth/login" className="nav-item">Login</NavLink>
      <NavLink to="/auth/register" className="nav-item">Register</NavLink>

      {/* Theme Toggle Button */}
      <button className="px-3 py-1 border rounded-md">Theme</button>
    </>
  );

  const navLinksAfterLogin = (
    <>
      <NavLink to="/" className="nav-item">Home</NavLink>
      <NavLink to="/all-loans" className="nav-item">All-Loans</NavLink>
      <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>

      {/* Avatar */}
      <img
        src={user?.photoURL}
        alt="avatar"
        className="w-10 h-10 rounded-full border"
      />

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LoanLink
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {user ? navLinksAfterLogin : navLinksBeforeLogin}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 flex flex-col gap-4">
          {user ? navLinksAfterLogin : navLinksBeforeLogin}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
