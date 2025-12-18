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
      const res = await axiosSecure.get(`/admin/applications${filter !== "all" ? `?status=${filter}` : ""}`);
      return res.data;
    },
  });

  const statusM = useMutation({
    mutationFn: async ({ id, status }) => axiosSecure.patch(`/admin/applications/status/${id}`, { status }),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries(["admin-apps"]);
      setView(null);
    },
    onError: () => toast.error("Update failed"),
  });

  if (isLoading) return <Spinner/>;

  return (
    <div className="p-4">
      <title>Loan Applications</title>
      <h2 className="text-2xl font-bold mb-4">Loan Applications</h2>

      <div className="flex gap-2 mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Loan ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a.loanId || a._id}</td>
                <td className="p-2">{a.userName}<br /><small>{a.userEmail}</small></td>
                <td className="p-2">{a.category || a.loanCategory || "-"}</td>
                <td className="p-2">${a.loanAmount || a.amount}</td>
                <td className="p-2">{a.status}</td>
                <td className="p-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setView(a)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {view && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Application</h3>
            <p><b>Name:</b> {view.userName}</p>
            <p><b>Email:</b> {view.userEmail}</p>
            <p><b>Amount:</b> ${view.loanAmount || view.amount}</p>
            <p><b>Status:</b> {view.status}</p>

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => statusM.mutate({ id: view._id, status: "Rejected" })}>Reject</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => statusM.mutate({ id: view._id, status: "Approved" })}>Approve</button>
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setView(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;

