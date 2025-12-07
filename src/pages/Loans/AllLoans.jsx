import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all loans using TanStack Query
  const { data: loans = [],
    isLoading,
    isError,} = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });


  
  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading Loans...</div>;
  }

  if (isError) {
    toast.error("Failed to fetch loans. Please try again!");
    return (
      <div className="text-center mt-10 text-red-500">Error loading loans!</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Available Loans</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="border rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={loan.image}
              alt={loan.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
            <p className="text-gray-600 mb-2">
              {loan.description?.slice(0, 100)}...
            </p>
            <p className="text-gray-800 font-medium mb-2">
              Max Loan: ${loan.maxLimit}
            </p>
            <button
              onClick={() => navigate(`/all-loans/${loan._id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
