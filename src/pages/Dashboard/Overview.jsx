import React from "react";
import { FaUsers, FaMoneyCheckAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Overview = () => {
  const { user, role } = useAuth(); // role useAuth theke directly ashe

  // Role-based cards data
  const statsData = {
    admin: [
      { icon: <FaUsers />, title: "Total Users", value: "1,240", color: "bg-blue-600" },
      { icon: <FaMoneyCheckAlt />, title: "Total Loans", value: "$540,000", color: "bg-green-600" },
      { icon: <FaClock />, title: "Pending Applications", value: "18", color: "bg-yellow-500" },
      { icon: <FaCheckCircle />, title: "Approved Loans", value: "96", color: "bg-purple-600" },
    ],
    manager: [
      { icon: <FaMoneyCheckAlt />, title: "My Created Loans", value: "48", color: "bg-green-600" },
      { icon: <FaClock />, title: "Pending Applications", value: "12", color: "bg-yellow-500" },
      { icon: <FaCheckCircle />, title: "Approved Loans", value: "36", color: "bg-purple-600" },
      { icon: <FaUsers />, title: "Borrowers Managed", value: "180", color: "bg-blue-600" },
    ],
    user: [
      { icon: <FaMoneyCheckAlt />, title: "My Loans", value: "5", color: "bg-green-600" },
      { icon: <FaClock />, title: "Pending Applications", value: "1", color: "bg-yellow-500" },
      { icon: <FaCheckCircle />, title: "Approved Loans", value: "4", color: "bg-purple-600" },
      { icon: <FaUsers />, title: "Loan Officers Assigned", value: "2", color: "bg-blue-600" },
    ],
  };

  // Role-based chart titles
  const chartTitle = {
    admin: "Platform Loan Activity",
    manager: "My Loan Activity",
    user: "My Loan Applications",
  };

  // Safety check for invalid role
  const stats = statsData[role] || [];
  const chart = chartTitle[role] || "Loan Activity";

  return (
    <div className="p-6 space-y-6">
      <title>Dashboard</title>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back, {user?.displayName || "User"} 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.length > 0 ? (
          stats.map((stat, idx) => (
            <StatCard
              key={idx}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No stats available
          </p>
        )}
      </div>

      {/* Role-Based Section */}
      <RoleSection role={role} />

      {/* Chart Section */}
      <div className="bg-white dark:bg-[#142e29] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {chart}
        </h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400 dark:text-gray-500 dark:border-gray-600">
          📊 Chart will appear here (use Recharts / Chart.js / ApexCharts)
        </div>
      </div>
    </div>
  );
};

export default Overview;

/* ================= Components ================= */

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white dark:bg-[#142e29] rounded-xl shadow p-5 flex items-center gap-4">
    <div className={`${color} text-white p-4 rounded-full text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </p>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </h3>
    </div>
  </div>
);

const RoleSection = ({ role }) => {
  let content = null;

  if (role === "admin") {
    content = (
      <div className="bg-white dark:bg-[#142e29] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Admin Summary
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
          <li>Manage all users & roles</li>
          <li>View and filter all loan applications</li>
          <li>Control which loans appear on Home page</li>
          <li>Monitor platform-wide loan activity</li>
        </ul>
      </div>
    );
  } else if (role === "manager") {
    content = (
      <div className="bg-white dark:bg-[#142e29] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Manager Summary
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
          <li>Create & manage loan products</li>
          <li>Review pending loan applications</li>
          <li>Approve or reject borrower requests</li>
          <li>Track approved loans</li>
        </ul>
      </div>
    );
  } else {
    content = (
      <div className="bg-white dark:bg-[#142e29] rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Borrower Summary
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
          <li>Apply for microloans</li>
          <li>Track application status</li>
          <li>Pay application fee securely</li>
          <li>View approved loan details</li>
        </ul>
      </div>
    );
  }

  return content;
};
