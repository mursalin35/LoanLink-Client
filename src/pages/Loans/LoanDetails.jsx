import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const LoanDetails = () => {
  const { user, role } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch loan details
  const {
    data: loan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) {
    toast.error("Failed to fetch loan details");
    return <div className="text-center mt-10 text-red-500">Error!</div>;
  }

  const handleApply = () => {
    // Redirect to loan application form
    navigate(`/application/${loan._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <title>Loan Details</title>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Loan Image */}
        <div className="lg:w-1/2">
          <img
            src={loan.image}
            alt={loan.title}
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
        </div>

        {/* Loan Info */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">{loan.title}</h1>
          <p className="text-gray-600">{loan.description}</p>
          <p>
            <strong>Category:</strong> {loan.category}
          </p>
          <p>
            <strong>Interest Rate:</strong> {loan.interest}%
          </p>
          <p>
            <strong>Max Loan:</strong> ${loan.maxLimit}
          </p>
          <p>
            <strong>Available EMI Plans:</strong>{" "}
            {loan.emiPlans?.join(", ") || "N/A"}
          </p>

          {role === "user" && (
            <button
              onClick={handleApply}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
