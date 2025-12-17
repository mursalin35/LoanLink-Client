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
  const [paymentDetails, setPaymentDetails] = useState(null) // payment details modal 

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

    if (isLoading) return <Spinner/>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load loans.</p>
    );
  if (loans.length === 0)
    return (
      <p className="text-center mt-10">You have no loan applications yet.</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Loans</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Loan ID</th>
              <th className="px-4 py-2">Loan Info</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Fee Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{loan._id.slice(-6)}</td>
                <td className="px-4 py-2">{loan.loanTitle}</td>
                <td className="px-4 py-2">${loan.loanAmount}</td>
                <td className="px-4 py-2">{loan.status}</td>
                <td className="px-4 py-2">{loan.applicationFeeStatus}</td>
                <td className="px-4 py-2 flex flex-col md:flex-row gap-2 justify-center">
                  <button
                    onClick={() => setViewLoan(loan)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>

                  {loan.status === "Pending" &&
                    loan.applicationFeeStatus === "Unpaid" && (
                      <button
                        onClick={() => handleCancel(loan._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}

                  {loan.applicationFeeStatus === "Unpaid" ? (
                    <button
                      onClick={() => handlePay(loan)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      onClick={() => setPaymentDetails(loan)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* application view Modal */}
      {viewLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewLoan(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{viewLoan.loanTitle}</h2>
            <p>
              <strong>Loan ID:</strong> {viewLoan._id}
            </p>
            <p>
              <strong>Amount:</strong> ${viewLoan.loanAmount}
            </p>
            <p>
              <strong>Status:</strong> {viewLoan.status}
            </p>
            <p>
              <strong>Fee Status:</strong> {viewLoan.applicationFeeStatus}
            </p>
            <p>
              <strong>Applied At:</strong>{" "}
              {new Date(viewLoan.appliedAt).toLocaleString()}
            </p>
            <p>
              <strong>Income Source:</strong> {viewLoan.incomeSource}
            </p>
            <p>
              <strong>Monthly Income:</strong> ${viewLoan.monthlyIncome}
            </p>
            <p>
              <strong>Reason for Loan:</strong> {viewLoan.reason}
            </p>
            <p>
              <strong>Address:</strong> {viewLoan.address}
            </p>
            <p>
              <strong>Extra Notes:</strong> {viewLoan.extraNotes}
            </p>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
{paymentDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6 relative">
      <button
        onClick={() => setPaymentDetails(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Payment Details
      </h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Loan ID:</strong> {paymentDetails._id}</p>
      <p><strong>Loan Title:</strong> {paymentDetails.loanTitle}</p>
      <p><strong>Amount Paid:</strong> $10</p>
      <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
      <p><strong>Tracking ID:</strong> {paymentDetails.trackingId}</p>
      <p>
        <strong>Paid At:</strong>{" "}
        {paymentDetails.paidAt
          ? new Date(paymentDetails.paidAt).toLocaleString()
          : "N/A"}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default MyLoans;
