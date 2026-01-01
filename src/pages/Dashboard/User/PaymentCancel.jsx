import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle, FaArrowLeft } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center px-4 
   
      ">

      <title>Payment Cancel</title>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl p-8 text-center
        bg-white/90 dark:bg-[#162B25]/90
        backdrop-blur-xl shadow-2xl border
        border-[#E2E8E6] dark:border-[#1F3D36]">

        {/* Accent Bar */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 
          w-24 h-1.5 rounded-full bg-red-500" />

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full 
            bg-red-100 dark:bg-red-500/10">
            <FaTimesCircle className="text-4xl text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold mb-2
          text-[#1C2B27] dark:text-[#E6F4F1]">
          Payment Canceled
        </h1>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-7
          text-[#6B7C75] dark:text-[#9FB7AF]">
          Your payment could not be completed.  
          No money was charged. You can safely try again.
        </p>

        {/* Button */}
        <Link to="/dashboard/my-loans">
          <button
            className="w-full flex items-center justify-center gap-2 py-3
            rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#1F4F45] to-[#2F6F62]
            hover:from-[#163C35] hover:to-[#255B52]
            transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <FaArrowLeft />
            Try Again
          </button>
        </Link>

        {/* Footer hint */}
        <p className="mt-5 text-xs text-[#8A9C95] dark:text-[#6F8F86]">
          If the problem continues, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
