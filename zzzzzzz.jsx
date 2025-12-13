import React from "react";
import { FaUsers, FaMoneyCheckAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Overview = () => {
  const { user, role } = useAuth();

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Welcome back, {user?.displayName || "User"} 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value="1,240"
          color="bg-blue-600"
        />
        <StatCard
          icon={<FaMoneyCheckAlt />}
          title="Total Loans"
          value="$540,000"
          color="bg-green-600"
        />
        <StatCard
          icon={<FaClock />}
          title="Pending Applications"
          value="18"
          color="bg-yellow-500"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Approved Loans"
          value="96"
          color="bg-purple-600"
        />
      </div>

      {/* Role Based Sections */}
      {role === "admin" && <AdminSection />}
      {role === "manager" && <ManagerSection />}
      {role === "user" && <BorrowerSection />}

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Loan Activity Analytics
        </h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
          📊 Chart will be displayed here (Recharts / Chart.js)
        </div>
      </div>
    </div>
  );
};

export default Overview;

/* ================= Components ================= */

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex items-center gap-4">
    <div className={`${color} text-white p-4 rounded-full text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </h3>
    </div>
  </div>
);

const AdminSection = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
      Admin Summary
    </h2>
    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
      <li>Manage all users & roles</li>
      <li>View and filter all loan applications</li>
      <li>Control which loans appear on Home page</li>
      <li>Monitor platform-wide loan activity</li>
    </ul>
  </div>
);

const ManagerSection = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
      Manager Summary
    </h2>
    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
      <li>Create & manage loan products</li>
      <li>Review pending loan applications</li>
      <li>Approve or reject borrower requests</li>
      <li>Track approved loans</li>
    </ul>
  </div>
);

const BorrowerSection = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
      Borrower Summary
    </h2>
    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
      <li>Apply for microloans</li>
      <li>Track application status</li>
      <li>Pay application fee securely</li>
      <li>View approved loan details</li>
    </ul>
  </div>
);
