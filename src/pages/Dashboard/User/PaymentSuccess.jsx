import React from "react";
import { useSearchParams } from "react-router";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  // React Query for fetching payment success
  const { data: paymentInfo, isError } = useQuery({
    queryKey: ["paymentSuccess", sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      const res = await axiosSecure.patch(
        `/payment-success?session_id=${sessionId}`
      );
      return res.data;
    },
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (isError)
    return <p className="text-center py-10">Failed to fetch payment info</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <title>Payment Success</title>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 dark:bg-[#162B25]/90 rounded-3xl shadow-2xl p-8 text-center border border-[#E2E8E6] dark:border-[#1F3D36] backdrop-blur-xl"
      >
        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-4"
        >
          <FaCheckCircle className="text-7xl text-green-500 dark:text-green-400 animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-extrabold mb-3 text-[#1C2B27] dark:text-[#E6F4F1]"
        >
          Payment Successful!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm mb-6 text-[#6B7C75] dark:text-[#9FB7AF]"
        >
          Your payment has been completed successfully.
        </motion.p>

        {/* Transaction Info */}
        {paymentInfo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-[#F4F7F5] dark:bg-[#1F3D36] rounded-xl p-4 mb-6 text-left relative"
          >
            <p className="text-sm text-[#1C2B27] dark:text-[#E6F4F1] flex items-center justify-between">
              <span className="font-semibold">Transaction ID:</span>{" "}
              {paymentInfo.transactionId || "N/A"}
              {paymentInfo.transactionId && (
                <FaCopy
                  onClick={() => handleCopy(paymentInfo.transactionId)}
                  className="ml-2 cursor-pointer text-gray-400 dark:text-gray-300 hover:text-[#1F4F45] dark:hover:text-[#6FBF73] transition-colors"
                />
              )}
            </p>

            <p className="text-sm text-[#1C2B27] dark:text-[#E6F4F1] flex items-center justify-between mt-2">
              <span className="font-semibold">Tracking ID:</span>{" "}
              {paymentInfo.trackingId || "N/A"}
              {paymentInfo.trackingId && (
                <FaCopy
                  onClick={() => handleCopy(paymentInfo.trackingId)}
                  className="ml-2 cursor-pointer text-gray-400 dark:text-gray-300 hover:text-[#1F4F45] dark:hover:text-[#6FBF73] transition-colors"
                />
              )}
            </p>
          </motion.div>
        ) : (
          <span className="loading loading-bars loading-lg"></span>
        )}
        {/* Back to Dashboard Button */}
        <motion.a
          href="/dashboard/my-loans"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-block w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#1F4F45] to-[#2F6F62]
            hover:from-[#163C35] hover:to-[#255B52]
            transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Back to Dashboard
        </motion.a>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
