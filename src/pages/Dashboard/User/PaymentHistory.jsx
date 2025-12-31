import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, // prevent undefined request
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <title>Payment History</title>
      <h2 className="text-3xl font-bold mb-6">
        Payment History ({payments.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SI.No</th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Paid Time</th>
              <th>Transaction ID</th>
              <th>Tracking ID</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.loanTitle}</td>
                <td>${payment.amount}</td>
                <td>
                  {new Date(payment.paidAt).toLocaleString()}
                </td>
                <td className="text-xs break-all">
                  {payment.transactionId}
                </td>
                <td className="font-mono text-sm">
                  {payment.trackingId}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
