import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";

const MyLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [viewLoan, setViewLoan] = useState(null); // Selected loan for modal
  const [paymentDetails, setPaymentDetails] = useState(null); // payment details modal

  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return null;
  }

  const {
    data: loans = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myLoans", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (loanId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/applications/cancel/${loanId}`
          );
          toast.success("Loan application canceled");
          if (refetch) refetch();
          Swal.fire(
            "Canceled!",
            "Your loan application has been canceled.",
            "success"
          );
        } catch (error) {
          console.error(error);
          toast.error("Failed to cancel loan");
          Swal.fire("Error!", "Failed to cancel loan application.", "error");
        }
      }
    });
  };

  // payment *****************
  const handlePay = async (loan) => {
    try {
      const paymentInfo = {
        loanId: loan._id, // backend expects this
        loanTitle: loan.loanTitle, // name shown in Stripe
        loanAmount: 10, // fixed $10 fee
        userEmail: user.email,
      };

      const res = await axiosSecure.post(
        "/payment-checkout-system",
        paymentInfo
      );

      // Stripe redirect
      window.location.assign(res.data.url);
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load loans.</p>
    );
  if (loans.length === 0)
    return (
      <p className="text-center mt-10">You have no loan applications yet.</p>
    );

  return (
   <div className="min-h-screen bg-[#0F1E1B] px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto text-[#E6F2EF]">
  <title>My Loans</title>

  {/* Header */}
  <div className="mb-6 text-center sm:text-left">
    <h1 className="text-3xl font-semibold text-[#E6F2EF]">
      My Loans
    </h1>
    <p className="text-sm sm:text-base text-[#9FB8B2] mt-2">
      View and manage your loan applications
    </p>
  </div>

  {/* Desktop / Tablet Table */}
  <div className="hidden sm:block bg-[#132925] rounded-md shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm sm:text-base">
        <thead className="bg-[#1F4F45] text-[#E6F2EF]">
          <tr>
            <th className="px-4 py-4 text-left">Loan Info</th>
            <th className="px-4 py-4 text-left">Amount</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-4 py-4 text-left">Fee Status</th>
            <th className="px-4 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#1E3A35]">
          {loans.map((loan) => (
            <tr
              key={loan._id}
              className="hover:bg-[#173732] transition"
            >
              <td className="flex flex-col gap-1 px-4 py-3 font-semibold text-[#E6F2EF]">
                {loan.loanTitle}
                <span className="text-sm font-normal text-[#9FB8B2]">
                  #{loan._id.slice(-10)}
                </span>
              </td>

              <td className="px-4 py-3 text-[#6FBF73]">
                ${loan.loanAmount}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                    loan.status === "Approved"
                      ? "bg-[#6FBF73]/20 text-[#6FBF73]"
                      : loan.status === "Pending"
                      ? "bg-[#B6E04C]/20 text-[#E6F2EF]"
                      : loan.status === "Rejected"
                      ? "bg-red-900/40 text-red-400"
                      : loan.status === "Cancelled"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-600 text-[#E6F2EF]"
                  }`}
                >
                  {loan.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                    loan.applicationFeeStatus === "Paid"
                      ? "bg-[#6FBF73]/20 text-[#6FBF73]"
                      : "bg-[#B6E04C]/20 text-[#E6F2EF]"
                  }`}
                >
                  {loan.applicationFeeStatus}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* View */}
                  <button
                    onClick={() => setViewLoan(loan)}
                    className="px-3 py-1 rounded-md bg-[#1E3A35] text-[#E6F2EF] text-sm font-semibold hover:bg-[#1F4F45] transition"
                  >
                    View
                  </button>

                  {/* Cancel */}
                  {loan.status === "Pending" &&
                    loan.applicationFeeStatus === "Unpaid" && (
                      <button
                        onClick={() => handleCancel(loan._id)}
                        className="px-3 py-1 rounded-md bg-red-700 text-white text-sm font-semibold hover:bg-red-800 transition"
                      >
                        Cancel
                      </button>
                    )}

                  {/* Pay / Paid */}
                  {loan.applicationFeeStatus === "Unpaid" ? (
                    <button
                      onClick={() => handlePay(loan)}
                      className="px-3 py-1 rounded-md bg-[#B6E04C] text-[#1C2B27] font-semibold text-sm hover:bg-[#6FBF73] transition"
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      onClick={() => setPaymentDetails(loan)}
                      className="px-3 py-1 rounded-md bg-gray-700 text-[#E6F2EF] font-semibold text-sm hover:bg-[#1F4F45] transition"
                    >
                      Paid
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Mobile Card View */}
  <div className="sm:hidden space-y-4">
    {loans.map((loan) => (
      <div
        key={loan._id}
        className="bg-[#132925] rounded-2xl shadow-md p-5 space-y-4 border border-[#1E3A35]"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-[#E6F2EF] text-lg">
              {loan.loanTitle}
            </h2>
            <span className="text-xs text-[#9FB8B2] mt-1 block">
              #{loan._id.slice(-10)}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              loan.status === "Approved"
                ? "bg-[#6FBF73]/20 text-[#6FBF73]"
                : loan.status === "Pending"
                ? "bg-[#B6E04C]/20 text-[#E6F2EF]"
                : loan.status === "Rejected"
                ? "bg-red-900/40 text-red-400"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {loan.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-[#E6F2EF]">
          <p><strong>Amount:</strong> ${loan.loanAmount}</p>
          <p>
            <strong>Fee Status:</strong>
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                loan.applicationFeeStatus === "Paid"
                  ? "bg-[#6FBF73]/20 text-[#6FBF73]"
                  : "bg-[#B6E04C]/20 text-[#E6F2EF]"
              }`}
            >
              {loan.applicationFeeStatus}
            </span>
          </p>
          <p>
            <strong>Applied At:</strong>{" "}
            {new Date(loan.appliedAt).toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Modals background already dark-friendly */}
</div>

  );
};

export default MyLoans;
