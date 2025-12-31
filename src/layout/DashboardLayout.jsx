import { useState, useEffect } from "react";
import { FaUsersGear } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import ScrollToTop from "../components/ScrollToTop";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaMoneyCheck,
  FaSignOutAlt,
  FaHandHoldingUsd,
  FaFileAlt,
  FaHistory,
  FaTasks,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false); // mobile sidebar initially hidden
  const [isMobile, setIsMobile] = useState(false);
  const { user, logOut, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(false); // desktop uses static sidebar
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
      {
        name: "My Loans",
        icon: <FaHandHoldingUsd />,
        path: "/dashboard/my-loans",
      },
      // After mark
      // {
      //   name: "Payment History",
      //   icon: <FaHistory />,
      //   path: "/dashboard/payment-history",
      // },
    ],
    manager: [
      { name: "Add Loan", icon: <FaMoneyCheck />, path: "/dashboard/add-loan" },
      {
        name: "Manage Loans",
        icon: <FaTasks />,
        path: "/dashboard/manage-loans",
      },
      {
        name: "Pending Apps",
        icon: <FaHourglassHalf />,
        path: "/dashboard/pending-loans",
      },
      {
        name: "Approved",
        icon: <FaCheckCircle />,
        path: "/dashboard/approved-loans",
      },
    ],
    admin: [
      {
        name: "Manage Users",
        icon: <FaUsersGear />,
        path: "/dashboard/manage-users",
      },
      {
        name: "All Loans",
        icon: <FaHandHoldingUsd />,
        path: "/dashboard/all-loan",
      },
      {
        name: "Loan Applications",
        icon: <FaFileAlt />,
        path: "/dashboard/loan-applications",
      },
    ],
  };

  const menuItems = [...mainMenu, ...(roleMenu[role] || [])];

  return (
   <div className="flex min-h-screen bg-[#F4F7F5] dark:bg-[#0f1f1c]">
  <ScrollToTop />

  {/* Sidebar */}
  <div
    className={`
      fixed z-50 top-0 left-0 h-full 
      bg-[#1F4F45] dark:bg-[#142e29]
      text-white shadow-lg flex flex-col transition-transform duration-300
      ${
        isMobile
          ? open
            ? "translate-x-0"
            : "-translate-x-full"
          : "translate-x-0 w-64 md:w-64"
      }
      w-64
    `}
  >
    {/* Mobile overlay */}
    {isMobile && open && (
      <div
        className="fixed inset-0  z-40"
        onClick={() => setOpen(false)}
      />
    )}

    {/* Sidebar content */}
    <div className="flex flex-col h-full z-50">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-[#ffffff33] dark:border-[#ffffff22]">
        <Link to="/" className="font-bold text-xl">
          LoanLink
        </Link>

        {isMobile && (
          <button
            className="text-white hover:text-[#B6E04C] transition-colors"
            onClick={() => setOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

      {/* Menu */}
      <ul className="flex-1 p-4 space-y-2 overflow-auto">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#6FBF73] text-[#1F4F45] font-semibold shadow dark:bg-[#4ea860] dark:text-[#0f1f1c]"
                    : "hover:bg-[#B6E04C] hover:text-[#1F4F45] dark:hover:bg-[#8fcf6a]"
                }`
              }
              onClick={() => isMobile && setOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-[#ffffff33] dark:border-[#ffffff22]">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 w-full p-2 rounded-lg 
            text-[#B6E04C]
            hover:bg-red-100 hover:text-red-600
            dark:hover:bg-red-500/20 dark:hover:text-red-400
            transition-all duration-200
          "
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>

  {/* Main content */}
  <div className="flex-1 flex flex-col md:ml-64">
    {/* Top Navbar */}
    <div className="
      flex justify-between items-center h-16 px-6 shadow-md 
      bg-[#e5f4e3] dark:bg-[#132d28]
      border-b border-[#E0E7E2] dark:border-[#1f3f35]
      sticky top-0 z-30
    ">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            className="text-[#1F4F45] hover:text-[#6FBF73] dark:text-[#9fd9c6] transition-colors"
            onClick={() => setOpen(true)}
          >
            <FaBars size={20} />
          </button>
        )}

        <h2 className="flex items-center gap-1 text-[#1f6c57] dark:text-[#B6E04C] font-semibold text-xl">
          <FaHome /> Dashboard
        </h2>
      </div>

      <Link to="/">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
            alt="User"
            className="
              w-10 h-10 rounded-full border-2 
              border-[#B6E04C] hover:border-[#6FBF73]
              transition-all duration-200
            "
          />
          <p className="font-medium text-[#1C2B27] dark:text-[#EAF3F1]">
            {user?.displayName || "User"}
          </p>
        </div>
      </Link>
    </div>

    {/* Page Content */}
    <div className="p-6 flex-1 overflow-auto text-[#1C2B27] dark:text-[#EAF3F1]">
      <Outlet />
    </div>
  </div>
</div>

  );
};

export default DashboardLayout;
