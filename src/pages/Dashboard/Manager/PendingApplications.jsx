import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading) return <p>Loading pending applications...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>

      {apps.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <div key={a._id} className="p-4 bg-white shadow rounded flex justify-between">
              <div>
                <h3 className="font-semibold">{a.loanTitle} — ${a.loanAmount}</h3>
                <p className="text-sm text-gray-600">{a.firstName} {a.lastName} • {a.userEmail}</p>
                <p className="text-sm">Applied: {new Date(a.appliedAt).toLocaleString()}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => approveMutation.mutate(a._id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => rejectMutation.mutate(a._id)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingApplications;

