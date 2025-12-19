import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext);

  const defaultEmail = location.state?.email || "user@example.com";
  const [email] = useState(defaultEmail);

  const handleReset = () => {
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox 📩");
        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
        }, 1500);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address!");
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      
      <title>Reset Password</title>
      <Toaster position="top-center" />

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-10 bg-white dark:bg-[#2C2C3A] rounded-[2rem] shadow-2xl border border-[#6FBF73] dark:border-[#B6E04C] overflow-hidden"
      >
        {/* Glowing Header Circle */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-[#1F4F45] to-[#6FBF73] flex items-center justify-center shadow-lg animate-pulse">
          <FaLock className="text-white text-4xl" />
        </div>

        {/* Title & Subtitle */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#1F4F45] dark:text-[#EDEBFF] mb-2">
            Reset Your Password
          </h2>
          <p className="text-sm text-[#6B7C75] dark:text-[#B0B3C6]">
            Enter your registered email below and we will send you a link to reset your password.
          </p>
        </div>

        {/* Email Input */}
        <div className="mt-8 relative">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-4 pl-12 rounded-xl border border-[#6FBF73] dark:border-[#B6E04C] bg-[#F4F7F5] dark:bg-[#1F4F45] text-[#1C2B27] dark:text-[#EDEBFF] outline-none focus:ring-2 focus:ring-[#B6E04C] placeholder:text-[#6B7C75] dark:placeholder:text-[#B0B3C6]"
          />
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1F4F45] dark:text-[#B6E04C]" />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#1F4F45] to-[#6FBF73] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-[#6B7C75] dark:text-[#B0B3C6] hover:text-[#B6E04C] transition"
          >
            ← Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
