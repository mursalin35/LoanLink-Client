// src/pages/Dashboard/Manager/PendingApplications.jsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [viewApp, setViewApp] = useState(null);

  const { data: apps = [], isLoading, refetch } = useQuery({
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

  if (isLoading) return <Spinner/>;

  return (
    <div className="p-4">
      <title>Pending Loans</title>
      <h2 className="text-2xl font-bold mb-4">Pending Loan Applications</h2>

      {apps.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Loan ID</th>
                <th className="p-2">User Info</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-2">{a._id}</td>
                  <td className="p-2">
                    {a.firstName} {a.lastName}<br />
                    <span className="text-sm text-gray-600">{a.userEmail}</span>
                  </td>
                  <td className="p-2">${a.loanAmount}</td>
                  <td className="p-2">{new Date(a.appliedAt).toLocaleString()}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => approveMutation.mutate(a._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(a._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setViewApp(a)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-xl font-bold mb-3">Application Details</h3>
            <p><strong>Loan:</strong> {viewApp.loanTitle}</p>
            <p><strong>Amount:</strong> ${viewApp.loanAmount}</p>
            <p><strong>Borrower:</strong> {viewApp.firstName} {viewApp.lastName}</p>
            <p><strong>Email:</strong> {viewApp.userEmail}</p>
            <p><strong>Status:</strong> {viewApp.status}</p>
            <p><strong>Applied At:</strong> {new Date(viewApp.appliedAt).toLocaleString()}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewApp(null)}
                className="px-3 py-1 bg-gray-300 rounded"
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

export default PendingApplications;
