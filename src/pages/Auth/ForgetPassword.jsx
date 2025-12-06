import React, { useState, useContext } from "react";
import { FaEnvelope, FaLockOpen } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  document.title="Reset Pass"
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
    <div className="min-h-screen flex items-center justify-center  px-4 py-6">
      <title>Reset Password</title>
      <Toaster position="top-center" />

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-xl w-full max-w-md p-8 rounded-2xl shadow-[0_8px_30px_rgba(99,46,227,0.15)] border border-[#E2E0F5] dark:border-[#3D3A64] overflow-hidden"
      >
        {/* Glow Border */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] opacity-20 blur-xl"></div>

        {/* Header Icon */}
        <FaLockOpen className="text-4xl text-[#632EE3] mx-auto mb-3" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#1F1F2E] dark:text-[#EDEBFF]">
          Forgot Password?
        </h2>
        <p className="text-sm text-center text-[#6B6B82] dark:text-[#B0B3C6] mt-1 mb-6">
          Enter your email to reset your password.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#2E1F47] dark:text-[#EDEBFF] mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-[#E2E0F5] dark:border-[#3D3A64] rounded-lg overflow-hidden 
            bg-white/70 dark:bg-[#1F1F2E] backdrop-blur focus-within:ring-2 focus-within:ring-[#632EE3]">
              <FaEnvelope className="ml-3 text-[#632EE3]" />
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="w-full p-2.5 pl-3 bg-transparent outline-none text-[#1F1F2E] dark:text-[#EDEBFF]"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] 
            text-white font-medium py-2.5 rounded-lg shadow-sm hover:opacity-90 
            transition cursor-pointer"
          >
            Reset Password
          </button>

          {/* Back */}
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-[#6B6B82] dark:text-[#B0B3C6] hover:text-[#632EE3] transition cursor-pointer"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
