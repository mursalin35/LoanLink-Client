import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaMoneyCheck,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut, role } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setOpen(false);
      else setOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`${open ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 relative`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`${open ? "text-xl font-bold" : "hidden"} text-blue-600`}>LoanLink</h2>
          {isMobile && <button onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>}
        </div>

        <ul className="menu p-4 space-y-2 text-gray-700">
          {/* Common */}
          <li><NavLink to="/" className="flex items-center gap-3"><FaHome /> {open && "Dashboard"}</NavLink></li>

          {/* USER */}
          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/my-loans" className="flex items-center gap-3"><FaList /> {open && "My Loans"}</NavLink></li>
              <li><NavLink to="/dashboard/profile" className="flex items-center gap-3"><FaUser /> {open && "Profile"}</NavLink></li>
            </>
          )}

          {/* MANAGER */}
          {role === "manager" && (
            <>
              <li><NavLink to="/dashboard/add-loan" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Add Loan"}</NavLink></li>
              <li><NavLink to="/dashboard/manage-loans" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Manage Loans"}</NavLink></li>
              <li><NavLink to="/dashboard/pending-loans" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Pending Apps"}</NavLink></li>
              <li><NavLink to="/dashboard/approved-loans" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Approved"}</NavLink></li>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/manage-users" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Manage Users"}</NavLink></li>
              <li><NavLink to="/dashboard/all-loan" className="flex items-center gap-3"><FaMoneyCheck /> {open && "All Loans"}</NavLink></li>
              <li><NavLink to="/dashboard/loan-applications" className="flex items-center gap-3"><FaMoneyCheck /> {open && "Loan Applications"}</NavLink></li>
            </>
          )}
        </ul>

        <div className="absolute bottom-4 w-full px-4">
          <button onClick={() => logOut()} className="flex items-center gap-3 text-red-600 w-full">
            <FaSignOutAlt /> {open && "Logout"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-3">
            <img src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"} className="w-10 h-10 rounded-full border" alt="User" />
            <p className="font-medium">{user?.displayName || "User"}</p>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
