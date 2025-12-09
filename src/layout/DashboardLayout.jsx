import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUser, FaMoneyCheck, FaList, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut } = useAuth();

  // Check screen width for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setOpen(false); // collapse sidebar on small screens
      else setOpen(true); // full sidebar on large screens
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className={`${open ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 relative`}>
        
        {/* Top logo & toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`${open ? "text-xl font-bold" : "hidden"} text-blue-600`}>
            LoanLink
          </h2>
          {isMobile && (
            <button onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        {/* Menu */}
        <ul className="menu p-4 space-y-2 text-gray-700">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3">
              <FaHome /> {open && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="flex items-center gap-3">
              <FaUser /> {open && "My Profile"}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-loans" className="flex items-center gap-3">
              <FaList /> {open && "My Loan Applications"}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/apply-loan" className="flex items-center gap-3">
              <FaMoneyCheck /> {open && "Apply for Loan"}
            </Link>
          </li>
        </ul>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={logOut}
            className="flex items-center gap-3 text-red-600 w-full"
          >
            <FaSignOutAlt /> {open && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Top navbar */}
        <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
              className="w-10 h-10 rounded-full border"
              alt="User"
            />
            <p className="font-medium">{user?.displayName || "User"}</p>
          </div>
        </div>

        {/* Dynamic page */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
