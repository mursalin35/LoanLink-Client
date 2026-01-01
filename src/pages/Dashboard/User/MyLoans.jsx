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
    <div className="min-h-screen  px-4 sm:px-6  pt-4 pb-10 max-w-7xl mx-auto">
      <title>My Loans</title>

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-semibold text-[#1C2B27] dark:text-[#E6F2EF]">
          My Loans
        </h1>
        <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
          View and manage your loan applications
        </p>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden sm:block bg-white dark:bg-[#132925] rounded-md shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[#1F4F45] text-white">
              <tr>
                <th className="px-4 py-4 text-left">Loan Info</th>
                <th className="px-4 py-4 text-left">Amount</th>
                <th className="px-4 py-4 text-left">Status</th>
                <th className="px-4 py-4 text-left">Fee Status</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-[#2a5149]">
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-[#F4F7F5] dark:hover:bg-[#173732] transition">
                  <td className="flex flex-col gap-1 px-4 py-3 font-semibold text-[#1C2B27] dark:text-[#E6F2EF]">
                    {loan.loanTitle}
                    <span className="text-sm font-normal dark:text-[#9FB8B2]">
                      #{loan._id.slice(-10)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#1F4F45] dark:text-[#6FBF73]">
                    ${loan.loanAmount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                        loan.status === "Approved"
                          ? "bg-[#6FBF73]/30 text-[#1F4F45] dark:text-[#6FBF73]"
                          : loan.status === "Pending"
                          ? "bg-[#B6E04C]/30 text-[#1C2B27] dark:text-[#e0efeb]"
                          : loan.status === "Rejected"
                          && "bg-red-100 dark:bg-red-100/50 text-red-700 dark:text-[#930f0f]"
                       
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                        loan.applicationFeeStatus === "Paid"
                          ? "bg-[#6FBF73]/20 text-[#1F4F45] dark:text-[#6FBF73]"
                          : "bg-[#B6E04C]/30 text-[#1C2B27] dark:text-[#e0efeb]"
                      }`}
                    >
                      {loan.applicationFeeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setViewLoan(loan)}
                       className="px-3 py-1 rounded-md bg-[#F4F7F5] text-[#1C2B27] text-sm font-semibold 
           hover:bg-[#1F4F45] hover:text-white transition-colors
           dark:bg-[#1F3B36] dark:text-[#E6F4F1] dark:hover:bg-[#6FBF73] dark:hover:text-[#1C2B27]"

                      >
                        View
                      </button>
                      {loan.status === "Pending" &&
                        loan.applicationFeeStatus === "Unpaid" && (
                          <button
                            onClick={() => handleCancel(loan._id)}
                            className="px-3 py-1 rounded-md bg-red-400 text-white text-sm font-semibold hover:bg-red-500 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      {loan.applicationFeeStatus === "Unpaid" ? (
                        <button
                          onClick={() => handlePay(loan)}
                          className="px-3 py-1 rounded-md bg-[#B6E04C] dark:bg-[#8fae41] text-[#1C2B27] font-semibold text-sm hover:bg-[#6FBF73] transition-colors"
                        >
                          Pay
                        </button>
                      ) : (
                        <button
                          onClick={() => setPaymentDetails(loan)}
                       className="px-3 py-1 rounded-md bg-gray-200 text-[#1C2B27] font-semibold text-sm
           hover:bg-[#1F4F45] hover:text-white transition-colors
           dark:bg-[#2c574f] dark:text-[#E6F4F1] dark:hover:bg-[#6FBF73] dark:hover:text-[#1C2B27]"

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
            className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-[#1C2B27] text-lg">
                  {loan.loanTitle}
                </h2>
                <span className="text-xs text-[#6B7C75] mt-1 block">
                  #{loan._id.slice(-10)}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  loan.status === "Approved"
                    ? "bg-[#6FBF73]/30 text-[#1F4F45] dark:text-[#6FBF73]"
                    : loan.status === "Pending"
                    ? "bg-[#B6E04C]/30 text-[#1C2B27]"
                    : loan.status === "Rejected"
                    ? "bg-red-200 text-red-700"
                    : loan.status === "Cancelled"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-100 text-[#1C2B27]"
                }`}
              >
                {loan.status}
              </span>
            </div>

            {/* Loan Info */}
            <div className="grid grid-cols-1 gap-2 text-sm text-[#1C2B27]">
              <p>
                <strong>Amount:</strong> ${loan.loanAmount}
              </p>
              <p>
                <strong>Fee Status:</strong>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    loan.applicationFeeStatus === "Paid"
                      ? "bg-[#6FBF73]/20 text-[#1F4F45] dark:text-[#6FBF73]"
                      : "bg-[#B6E04C]/30 text-[#1C2B27]"
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

           

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setViewLoan(loan)}
                className="flex-1 sm:flex-auto px-3 py-2 rounded-md bg-[#F4F7F5] text-[#1C2B27] text-sm font-semibold hover:bg-[#1F4F45] hover:text-white transition-colors"
              >
                View
              </button>
              {loan.status === "Pending" &&
                loan.applicationFeeStatus === "Unpaid" && (
                  <button
                    onClick={() => handleCancel(loan._id)}
                    className="flex-1 sm:flex-auto px-3 py-2 rounded-md bg-red-400 text-white text-sm font-semibold hover:bg-red-500 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              {loan.applicationFeeStatus === "Unpaid" ? (
                <button
                  onClick={() => handlePay(loan)}
                  className="flex-1 sm:flex-auto px-3 py-2 rounded-md bg-[#B6E04C] text-[#1C2B27] font-semibold text-sm hover:bg-[#6FBF73] transition-colors"
                >
                  Pay
                </button>
              ) : (
                <button
                  onClick={() => setPaymentDetails(loan)}
                  className="flex-1 sm:flex-auto px-3 py-2 rounded-md bg-gray-200 text-[#1C2B27] font-semibold text-sm hover:bg-[#1F4F45] hover:text-white transition-colors"
                >
                  Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

       {/* View Loan Modal */}
      {viewLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setViewLoan(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] hover:text-[#ef4f4f] transition-colors"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#1F4F45] dark:text-[#6FBF73] text-center">
              {viewLoan.loanTitle}
            </h2>

            {/* Loan Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] dark:text-[#6FBF73] mb-2">
                Loan Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Loan ID:</strong> {viewLoan._id}
                </p>
                <p>
                  <strong>Amount:</strong> ${viewLoan.loanAmount}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      viewLoan.status === "Approved"
                        ? "bg-[#6FBF73]/30 text-[#1F4F45] dark:text-[#6FBF73]"
                        : viewLoan.status === "Pending"
                        ? "bg-[#B6E04C]/30 text-[#1C2B27]"
                        : viewLoan.status === "Rejected"
                        ? "bg-red-200 text-red-700"
                        : viewLoan.status === "Cancelled"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-[#1C2B27]"
                    }`}
                  >
                    {viewLoan.status}
                  </span>
                </p>
                <p>
                  <strong>Fee Status:</strong> {viewLoan.applicationFeeStatus}
                </p>
                <p>
                  <strong>Applied At:</strong>{" "}
                  {new Date(viewLoan.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Income & Personal Info Section */}
            <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
              <h3 className="text-lg font-semibold text-[#1F4F45] dark:text-[#6FBF73] mb-2">
                Personal Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Income Source:</strong> {viewLoan.incomeSource}
                </p>
                <p>
                  <strong>Monthly Income:</strong> ${viewLoan.monthlyIncome}
                </p>
                <p className="sm:col-span-2">
                  <strong>Reason:</strong> {viewLoan.reason}
                </p>
                <p className="sm:col-span-2">
                  <strong>Address:</strong> {viewLoan.address}
                </p>
                <p className="sm:col-span-2">
                  <strong>Notes:</strong> {viewLoan.extraNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPaymentDetails(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] hover:text-[#ef4f4f] transition-colors"
            >
              &times;
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-[#1F4F45] dark:text-[#6FBF73]">
              Payment Details
            </h2>
            <div className="bg-[#F4F7F5] rounded-xl p-4 shadow-inner space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Loan ID:</strong> {paymentDetails._id}
                </p>
                <p className="sm:col-span-2">
                  <strong>Loan Title:</strong> {paymentDetails.loanTitle}
                </p>
                <p>
                  <strong>Amount Paid:</strong> $10
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {paymentDetails.transactionId}
                </p>
                <p>
                  <strong>Tracking ID:</strong> {paymentDetails.trackingId}
                </p>
                <p className="sm:col-span-2">
                  <strong>Paid At:</strong>{" "}
                  {paymentDetails.paidAt
                    ? new Date(paymentDetails.paidAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
