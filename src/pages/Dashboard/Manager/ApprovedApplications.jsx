// src/pages/Dashboard/Manager/ApprovedApplications.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";

const ApprovedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [viewApp, setViewApp] = useState(null);

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["approvedApps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/approved");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (apps.length === 0)
    return <p className="p-4">No approved applications yet.</p>;

  return (
    <div className="min-h-screen bg-[#F4F7F5] px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto">
      <title>Approved Loans</title>

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-[#1C2B27]">
          Approved Loan Applications
        </h2>
        <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
          View and manage approved loans
        </p>
      </div>

      {/* Table */}
      <div className="hidden sm:block bg-white rounded-md shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[#1F4F45] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Loan ID</th>
                <th className="px-4 py-3 text-left">User Info</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Approved Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {apps.map((a) => (
                <tr key={a._id} className="hover:bg-[#F4F7F5] transition">
                  <td className="px-4 py-3 flex flex-col font-semibold text-[#1C2B27]">
                    {a.loanTitle}
                    <span className="text-sm font-normal">
                      #{a._id.slice(-10)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#1C2B27]">
                      {a.firstName} {a.lastName}
                    </p>
                    <span className="text-sm text-[#6B7C75]">
                      {a.userEmail}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#1F4F45]">${a.loanAmount}</td>
                  <td className="px-4 py-3 text-[#1C2B27]">
                    {a.approvedAt
                      ? new Date(a.approvedAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setViewApp(a)}
                      className="px-3 py-1 rounded-md bg-[#F4F7F5] text-[#1C2B27] font-semibold text-sm hover:bg-[#1F4F45] hover:text-white transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE + TABLET CARD VIEW =================  */}
      <div className="sm:hidden space-y-4">
        {apps.map((a) => (
          <div
            key={a._id}
            className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-[#1C2B27] text-lg">
                  {a.loanTitle}
                </h2>
                <span className="text-sm text-[#6B7C75] mt-1 block">
                  #{a._id.slice(-10)}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B6E04C]/30 text-[#1C2B27]">
                Pending
              </span>
            </div>

            {/* Info (ONLY what was already there) */}
            <div className="grid grid-cols-1 gap-2 text-sm text-[#1C2B27]">
              <p>
                <strong>User:</strong> {a.firstName} {a.lastName}
              </p>
              <p className="text-[#6B7C75]">{a.userEmail}</p>
              <p>
                <strong>Amount:</strong> ${a.loanAmount}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(a.appliedAt).toLocaleString()}
              </p>
            </div>

            {/* Actions buttons  */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setViewApp(a)}
                className="flex-1 px-3 py-2 rounded-md bg-[#e7ede9] text-[#1C2B27] font-semibold text-sm hover:bg-[#1F4F45] hover:text-white transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setViewApp(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] hover:text-[#ef4f4f] transition-colors"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#1F4F45] text-center">
              {viewApp.loanTitle}
            </h2>

            {/* Loan Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">
                Loan Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Loan ID:</strong> {viewApp._id}
                </p>
                <p>
                  <strong>Amount:</strong> ${viewApp.loanAmount}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#6FBF73]/30 text-[#1F4F45]">
                    {viewApp.status}
                  </span>
                </p>
                <p>
                  <strong>Application Fee:</strong>{" "}
                  {viewApp.applicationFeeStatus}
                </p>
                <p className="sm:col-span-2">
                  <strong>Applied At:</strong>{" "}
                  {new Date(viewApp.appliedAt).toLocaleString()}
                </p>
                <p className="sm:col-span-2">
                  <strong>Approved At:</strong>{" "}
                  {viewApp.approvedAt
                    ? new Date(viewApp.approvedAt).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>

            {/* Borrower Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">
                Borrower Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Name:</strong> {viewApp.firstName} {viewApp.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {viewApp.userEmail}
                </p>
                <p>
                  <strong>Contact Number:</strong> {viewApp.contactNumber}
                </p>
                <p>
                  <strong>National ID:</strong> {viewApp.nationalID}
                </p>
              </div>
            </div>

            {/* Personal & Income Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">
                Personal & Income Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Income Source:</strong> {viewApp.incomeSource}
                </p>
                <p>
                  <strong>Monthly Income:</strong> ${viewApp.monthlyIncome}
                </p>
                <p className="sm:col-span-2">
                  <strong>Reason:</strong> {viewApp.reason}
                </p>
                <p className="sm:col-span-2">
                  <strong>Address:</strong> {viewApp.address}
                </p>
                {viewApp.extraNotes && (
                  <p className="sm:col-span-2">
                    <strong>Notes:</strong> {viewApp.extraNotes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewApp(null)}
                className="px-3 py-1 rounded-md bg-gray-200 text-[#1C2B27] font-semibold hover:bg-[#1F4F45] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedApplications;
