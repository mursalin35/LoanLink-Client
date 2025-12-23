import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

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

  if (isLoading) return <div className="text-center mt-10"><Spinner/></div>;
  if (isError) {
    toast.error("Failed to fetch loan details");
    return <div className="text-center mt-10 text-red-500">Error!</div>;
  }

  const handleApply = () => {
    // Redirect to loan application form
    navigate(`/application/${loan._id}`);
  };

  return (
<div className="max-w-6xl mx-auto  mt-10 ">
  <div className=" mx-8  px-6 py-10 bg-[#f0fff4] rounded-xl min-h-screen">
  <title>Loan Details</title>

  <div className="flex flex-col lg:flex-row gap-10 ">
    {/* Loan Image */}
    <div className="lg:w-1/2">
      <div className="overflow-hidden rounded-2xl shadow-2xl border border-[#6B7C75]">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-full sm:h-96 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    {/* Loan Info */}
    <div className="lg:w-1/2 flex flex-col gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl  font-extrabold text-[#1C2B27]">{loan.title}</h1>
      <p className="text-[#6B7C75] text-md md:text-lg leading-relaxed">{loan.description}</p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-[#E0E0E0] hover:scale-105 transform transition-all duration-300">
          <p className="text-[#1C2B27] font-semibold mb-2">Category</p>
          <p className="text-[#6FBF73] font-medium">{loan.category}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-[#E0E0E0] hover:scale-105 transform transition-all duration-300">
          <p className="text-[#1C2B27] font-semibold mb-2">Interest Rate</p>
          <p className="bg-gradient-to-r from-[#B6E04C] to-[#6FBF73] inline-block px-3 py-1 rounded-full text-white font-bold">
            {loan.interest}%
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-[#E0E0E0] hover:scale-105 transform transition-all duration-300">
          <p className="text-[#1C2B27] font-semibold mb-2">Max Loan</p>
          <p className="bg-gradient-to-r from-[#B6E04C] to-[#6FBF73] inline-block px-3 py-1 rounded-full text-white font-bold">
            ${loan.maxLimit}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-[#E0E0E0] hover:scale-105 transform transition-all duration-300">
          <p className="text-[#1C2B27] font-semibold mb-2">Available EMI Plans</p>
          <p className="text-[#6FBF73] font-medium">{loan.emiPlans?.join(", ") || "N/A"}</p>
        </div>
      </div>

      {role === "user" && (
        <button
          onClick={handleApply}
          className="mt-8 bg-gradient-to-r from-[#1F4F45] to-[#6FBF73] text-white font-semibold py-4 px-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
        >
          Apply Now
        </button>
      )}
    </div>
  </div>
</div>
</div>



  );
};

export default LoanDetails;
