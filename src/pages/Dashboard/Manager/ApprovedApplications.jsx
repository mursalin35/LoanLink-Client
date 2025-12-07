import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["approvedApps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/approved");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading approved applications...</p>;

  if (apps.length === 0) return <p className="p-4">No approved applications yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Approved Applications</h2>
      <div className="space-y-3">
        {apps.map((a) => (
          <div key={a._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{a.loanTitle} — ${a.loanAmount}</h3>
            <p className="text-sm text-gray-600">{a.firstName} {a.lastName} • {a.userEmail}</p>
            <p className="text-sm">Approved: {a.approvedAt ? new Date(a.approvedAt).toLocaleString() : "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedApplications;
