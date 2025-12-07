import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        <Link to="/dashboard" className="block hover:text-primary">
          Overview
        </Link>

        <Link to="/dashboard/my-loans" className="block hover:text-primary">
          My Loans
        </Link>

        {/* Manager only */}
        {user?.role === "manager" && (
          <Link to="/dashboard/pending-loans" className="block hover:text-primary">
            Pending Loans
          </Link>
        )}

        <Link to="/dashboard/profile" className="block hover:text-primary">
          Profile
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
