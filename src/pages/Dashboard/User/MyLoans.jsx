import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user not logged in
  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return null;
  }

  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["myLoans", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load loans.</p>;

  if (loans.length === 0)
    return <p className="text-center mt-10">You have no loan applications yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Loans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loans.map((loan) => (
          <div key={loan._id} className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{loan.loanTitle}</h3>
            <p><strong>Amount:</strong> ${loan.loanAmount}</p>
            <p><strong>Status:</strong> {loan.status}</p>
            <p><strong>Fee Status:</strong> {loan.applicationFeeStatus}</p>
            <p><strong>Applied At:</strong> {new Date(loan.appliedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLoans;
