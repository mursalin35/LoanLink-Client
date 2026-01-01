// src/pages/Dashboard/Manager/PendingApplications.jsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [viewApp, setViewApp] = useState(null);

  const {
    data: apps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingApps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/pending");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Application approved");
      refetch();
    },
    onError: () => toast.error("Approve failed"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Application rejected");
      refetch();
    },
    onError: () => toast.error("Reject failed"),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen  px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto">
      <title>Pending Loans</title>

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-semibold text-[#1C2B27] dark:text-[#E6F4F1] dark:text-[#E6F4F1]">
          Pending Loan Applications
        </h1>
        <p className="text-sm sm:text-base text-[#6B7C75] dark:text-[#9FB3AC] dark:text-[#B6E04C] mt-2">
          Review and manage pending loan requests
        </p>
      </div>

      {apps.length === 0 ? (
        <p className="text-[#6B7C75] dark:text-[#9FB3AC] dark:text-[#9FB3AC]">
          No pending applications.
        </p>
      ) : (
        <>
          {/* ================= MOBILE + TABLET CARD VIEW =================  */}
      <div className="sm:hidden space-y-4">
  {apps.map((a) => (
    <div
      key={a._id}
      className="bg-white dark:bg-[#162B25] rounded-2xl shadow-md p-5 space-y-4 border border-gray-100 dark:border-[#1F3D36]"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-[#1C2B27] dark:text-[#E6F4F1] text-2xl sm:text-lg">
            {a.loanTitle}
          </h2>
          <span className="text-sm text-[#6B7C75] dark:text-[#9FB3AC] mt-1 block">
            #{a._id.slice(-10)}
          </span>
        </div>

        <span
          className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B6E04C]/30 text-[#1C2B27] dark:text-[#E6F4F1] "
        >
          {a.status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 gap-2 text-sm text-[#1C2B27] dark:text-[#E6F4F1]">
        <p>
          <strong>User:</strong> {a.firstName} {a.lastName}
        </p>
        <p className="text-[#6B7C75] dark:text-[#9FB3AC]">{a.userEmail}</p>
        <p>
          <strong>Amount:</strong> ${a.loanAmount}
        </p>
        <p>
          <strong>Applied At:</strong> {new Date(a.appliedAt).toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => setViewApp(a)}
          className="flex-1 px-3 py-2 rounded-md 
            bg-[#F4F7F5] dark:bg-[#1F3D36] 
            text-[#1C2B27] dark:text-[#E6F4F1] 
            text-sm font-semibold 
            hover:bg-[#1F4F45] dark:hover:bg-[#2F6F62] 
            hover:text-white transition-colors
            
           
            
            
            
            "

        >
          View
        </button>

        <button
          onClick={() => rejectMutation.mutate(a._id)}
          className="flex-1 px-3 py-2 rounded-md 
            bg-red-400 dark:bg-red-600 
            hover:bg-red-500 dark:hover:bg-red-700 
            text-white text-sm font-semibold transition-colors"
        >
          Reject
        </button>

        <button
          onClick={() => approveMutation.mutate(a._id)}
          className="flex-1 px-3 py-2 rounded-md 
            bg-[#6FBF73] dark:bg-[#2F6F62] 
            hover:bg-[#5fb850] dark:hover:bg-[#255B52] 
            text-white text-sm font-semibold transition-colors
            
            
           
            "
        >
          Approve
        </button>
      </div>
    </div>
  ))}
</div>


          {/* ================= DESKTOP TABLE VIEW ================= */}
          <div className="hidden sm:block bg-white dark:bg-[#132925]  rounded-md shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-[#1F4F45]  text-white">
                  <tr>
                    <th className="px-4 py-4 text-left">Loan ID</th>
                    <th className="px-4 py-4 text-left">User Info</th>
                    <th className="px-4 py-4 text-left">Amount</th>
                    <th className="px-4 py-4 text-left">Date</th>
                    <th className="px-4 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bbc7c5] dark:divide-[#325f56] ">
                  {apps.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-[#F4F7F5] dark:hover:bg-[#142e29] transition"
                    >
                      <td className="px-4 py-3 flex flex-col font-semibold text-[#1C2B27] dark:text-[#E6F4F1]">
                        {a.loanTitle}
                        <span className="text-sm font-normal">
                          #{a._id.slice(-10)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1C2B27] dark:text-[#E6F4F1]">
                          {a.firstName} {a.lastName}
                        </p>
                        <span className="text-sm text-[#6B7C75] dark:text-[#9FB3AC]">
                          {a.userEmail}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#1F4F45] dark:text-[#6FBF73]">
                        ${a.loanAmount}
                      </td>
                      <td className="px-4 py-3 text-[#1C2B27] dark:text-[#E6F4F1]">
                        {new Date(a.appliedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-row gap-2">
                          <button
                            onClick={() => approveMutation.mutate(a._id)}
                            className="px-3 py-1 rounded-md 
bg-[#6FBF73] dark:bg-[#2F6F62] 
text-white dark:text-[#E6F4F1] 
text-sm font-semibold 
hover:bg-[#5fb850] dark:hover:bg-[#255B52] 
transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectMutation.mutate(a._id)}
                            className="px-3 py-1 rounded-md 
bg-red-400 dark:bg-red-500 
text-white dark:text-[#f0eaea] 
text-sm font-semibold 
hover:bg-red-500 dark:hover:bg-red-600 
transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setViewApp(a)}
                            className="px-3 py-1 rounded-md 
bg-[#e3e1e1] dark:bg-[#1F3D36] 
text-[#1C2B27] dark:text-[#E6F4F1] 
text-sm font-semibold 
hover:bg-[#1F4F45] hover:text-white 
dark:hover:bg-[#2F6F62] 
transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-[#162B25] rounded-2xl shadow-2xl w-full max-w-2xl p-6 py-8 relative max-h-[90vh] overflow-y-auto border border-[#E2E8E6] dark:border-[#1F3D36]">
            {/* Close Button */}
            <button
              onClick={() => setViewApp(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] dark:text-[#9FB3AC] hover:text-[#ef4f4f] transition-colors"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#1F4F45] dark:text-[#B6E04C] text-center">
              {viewApp.loanTitle}
            </h2>

            {/* Loan Details */}
            <div className="bg-[#F4F7F5] dark:bg-[#1F3D36] rounded-xl p-4 mb-4 shadow-inner border border-[#E2E8E6] dark:border-[#2A4B3D]">
              <h3 className="text-lg font-semibold text-[#1F4F45] dark:text-[#6FBF73] mb-2">
                Loan Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] dark:text-[#E6F4F1] text-sm sm:text-base">
                <p>
                  <strong>Loan ID:</strong> {viewApp.loanId}
                </p>
                <p>
                  <strong>Title:</strong> {viewApp.loanTitle}
                </p>
                <p>
                  <strong>Amount:</strong> ${viewApp.loanAmount}
                </p>
                <p>
                  <strong>Interest Rate:</strong> {viewApp.interestRate}%
                </p>

                
                <p>
                  <strong>Application Fee Status:</strong>{" "}
                  {viewApp.applicationFeeStatus}
                </p>
                <p>
                  <strong>Applied At:</strong>{" "}
                  {new Date(viewApp.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Borrower & Personal Info */}
            <div className="bg-[#F4F7F5] dark:bg-[#1F3D36] rounded-xl p-4 shadow-inner border border-[#E2E8E6] dark:border-[#2A4B3D]">
              <h3 className="text-lg font-semibold text-[#1F4F45] dark:text-[#6FBF73] mb-2">
                Borrower & Personal Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] dark:text-[#E6F4F1] text-sm sm:text-base">
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {viewApp.firstName}{" "}
                    {viewApp.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {viewApp.userEmail}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {viewApp.contactNumber}
                  </p>
                  <p>
                    <strong>Income Source:</strong> {viewApp.incomeSource}
                  </p>
                  <p>
                    <strong>Monthly Income:</strong> ${viewApp.monthlyIncome}
                  </p>
                </div>

                <div className="space-y-2">
                  <p>
                    <strong>National ID:</strong> {viewApp.nationalID}
                  </p>
                  <p>
                    <strong>Reason:</strong> {viewApp.reason}
                  </p>
                  <p>
                    <strong>Address:</strong> {viewApp.address}
                  </p>
                  {viewApp.extraNotes && (
                    <p>
                      <strong>Notes:</strong> {viewApp.extraNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApplications;
