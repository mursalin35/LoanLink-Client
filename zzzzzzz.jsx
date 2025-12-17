import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaMoneyCheck,
  FaList,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const mainMenu = [
    { name: "Overview", icon: <FaHome />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
  ];

  const roleMenu = {
    user: [
      { name: "My Loans", icon: <FaList />, path: "/dashboard/my-loans" },
      { name: "Payment History", icon: <FaList />, path: "/dashboard/payment-history" },
    ],
    manager: [
      { name: "Add Loan", icon: <FaMoneyCheck />, path: "/dashboard/add-loan" },
      { name: "Manage Loans", icon: <FaMoneyCheck />, path: "/dashboard/manage-loans" },
      { name: "Pending Apps", icon: <FaMoneyCheck />, path: "/dashboard/pending-loans" },
      { name: "Approved", icon: <FaMoneyCheck />, path: "/dashboard/approved-loans" },
    ],
    admin: [
      { name: "Manage Users", icon: <FaMoneyCheck />, path: "/dashboard/manage-users" },
      { name: "All Loans", icon: <FaMoneyCheck />, path: "/dashboard/all-loan" },
      { name: "Loan Applications", icon: <FaMoneyCheck />, path: "/dashboard/loan-applications" },
    ],
  };

  const menuItems = [...mainMenu, ...(roleMenu[role] || [])];

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 relative shadow-lg ${
          open ? "w-64" : "w-16"
        } bg-[#1F4F45] text-white flex flex-col`}
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#ffffff33]">
          <Link 
          to="/"
          className={`font-bold text-xl transition-all ${open ? "block" : "hidden"}`}>
            LoanLink
          </Link>
          <button
            className="md:hidden text-white hover:text-[#B6E04C] transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Menu */}
        <ul className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="group relative">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#6FBF73] text-[#1F4F45] font-semibold shadow"
                      : "hover:bg-[#B6E04C] hover:text-[#1F4F45]"
                  }`
                }
              >
                {item.icon}
                {open && <span>{item.name}</span>}
                {!open && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#1C2B27] text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="p-4 border-t border-[#ffffff33]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-100 hover:text-red-600 text-red-600 transition-all duration-200"
          >
            <FaSignOutAlt />
            {open && "Logout"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex justify-between items-center h-16 px-6 shadow-md bg-[#FFFFFF] border-b border-[#E0E7E2]">
          <div className="flex items-center gap-4">
            
            <h2 className="text-[#1C2B27] font-semibold text-xl">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-[#B6E04C] hover:border-[#6FBF73] transition-all duration-200"
            />
            <p className="font-medium text-[#1C2B27]">{user?.displayName || "User"}</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
