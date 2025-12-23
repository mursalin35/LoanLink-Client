// src/pages/Dashboard/Admin/LoanApplications.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const LoanApplications = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const [filter, setFilter] = useState("all");
  const [view, setView] = useState(null);

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["admin-apps", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/applications${filter !== "all" ? `?status=${filter}` : ""}`
      );
      return res.data;
    },
  });

  const statusM = useMutation({
    mutationFn: async ({ id, status }) =>
      axiosSecure.patch(`/admin/applications/status/${id}`, { status }),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries(["admin-apps"]);
      setView(null);
    },
    onError: () => toast.error("Update failed"),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#F4F7F5] px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto">
      <title>Loan Applications</title>

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-[#1C2B27]">
          Loan Applications
        </h2>
        <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
          View and manage all loan requests
        </p>
      </div>

      {/* Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-md border bg-white text-[#1C2B27] focus:outline-none focus:ring-2 focus:ring-[#1F4F45]"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block bg-white rounded-md shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[#1F4F45] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Loan ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {apps.map((a) => (
                <tr key={a._id} className="hover:bg-[#F4F7F5] transition">
                  <td className="px-4 py-3 font-semibold text-[#1C2B27]">
                    {a.loanTitle}
                    <span className="text-sm font-normal text-[#6B7C75] mt-1 block">
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
                  <td className="px-4 py-3">{a.loanCategory || "-"}</td>
                  <td className="px-4 py-3 text-[#1F4F45]">${a.loanAmount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    a.status === "Approved"
                      ? "bg-[#6FBF73]/30 text-[#1F4F45]"
                      : a.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setView(a)}
                      className="px-3 py-1 rounded-md bg-[#e7ede9] text-[#1C2B27] font-semibold hover:bg-[#1F4F45] hover:text-white transition"
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

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="sm:hidden space-y-4">
        {apps.map((a) => (
          <div
            key={a._id}
            className="bg-white rounded-2xl shadow-md p-5 border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-[#1C2B27]">
                  {a.firstName} {a.lastName}
                </h3>
                <p className="text-sm text-[#6B7C75]">{a.userEmail}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              a.status === "Approved"
                ? "bg-[#6FBF73]/30 text-[#1F4F45]"
                : a.status === "Rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
              >
                {a.status}
              </span>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <p>
                <strong>Loan Title:</strong> {a.loanTitle}
              </p>
              <p>
                <strong>Loan ID:</strong> #{a._id.slice(-10)}
              </p>
              <p>
                <strong>Category:</strong> {a.loanCategory || "-"}
              </p>
              <p>
                <strong>Amount:</strong> ${a.loanAmount}
              </p>
            </div>

            <button
              onClick={() => setView(a)}
              className="mt-4 w-full px-3 py-2 rounded-md bg-[#e7ede9] font-semibold hover:bg-[#1F4F45] hover:text-white transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {view && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setView(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] hover:text-[#ef4f4f] transition-colors"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#1F4F45] text-center">
              {view.loanTitle}
            </h2>

            {/* Loan Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">
                Loan Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Loan ID:</strong> {view.loanId}
                </p>
                <p>
                  <strong>Amount:</strong> ${view.loanAmount}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
            bg-yellow-100 text-yellow-700"
                  >
                    {view.status}
                  </span>
                </p>
                <p>
                  <strong>Application Fee:</strong> {view.applicationFeeStatus}
                </p>
                <p className="sm:col-span-2">
                  <strong>Applied At:</strong>{" "}
                  {new Date(view.appliedAt).toLocaleString()}
                </p>
                <p className="sm:col-span-2">
                  <strong>Approved At:</strong>{" "}
                  {view.approvedAt
                    ? new Date(view.approvedAt).toLocaleString()
                    : "—"}
                </p>
                <p>
                  <strong>Interest Rate:</strong> ${view.interestRate}
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
                  <strong>Name:</strong> {view.firstName} {view.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {view.userEmail}
                </p>
                <p>
                  <strong>Contact Number:</strong> {view.contactNumber}
                </p>
                <p>
                  <strong>National ID:</strong> {view.nationalID}
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
                  <strong>Income Source:</strong> {view.incomeSource}
                </p>
                <p>
                  <strong>Monthly Income:</strong> ${view.monthlyIncome}
                </p>
                <p className="sm:col-span-2">
                  <strong>Reason:</strong> {view.reason}
                </p>
                <p className="sm:col-span-2">
                  <strong>Address:</strong> {view.address}
                </p>
                {view.extraNotes && (
                  <p className="sm:col-span-2">
                    <strong>Notes:</strong> {view.extraNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 gap-2 flex-wrap">
              <button
                onClick={() =>
                  statusM.mutate({ id: view._id, status: "Rejected" })
                }
                className="px-3 py-1 rounded-md bg-red-600 text-white hover:opacity-90"
              >
                Reject
              </button>
              <button
                onClick={() =>
                  statusM.mutate({ id: view._id, status: "Approved" })
                }
                className="px-3 py-1 rounded-md bg-[#1F4F45] text-white hover:opacity-90"
              >
                Approve
              </button>
              <button
                onClick={() => setView(null)}
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

export default LoanApplications;
