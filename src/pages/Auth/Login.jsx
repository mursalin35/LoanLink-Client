import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const emailValue = watch("email");

  const handleLogin = (data) => {
    login(data.email, data.password)
      .then(() => {
        toast.success("Welcome back to LoanLink");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message || "Login failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-5 md:mt-0 px-4">
      <title>LogIn</title>

      {/* Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E2E8E6]">

        {/* LEFT INFO */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-[#1F4F45] text-white">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to <span className="text-[#B6E04C]">LoanLink</span>
          </h1>

          <p className="text-sm leading-relaxed text-[#D8E6E2] mb-6">
            LoanLink is a secure microloan request and approval platform designed
            to connect borrowers, managers, and administrators with trust,
            transparency, and speed.
          </p>

          <ul className="space-y-3 text-sm text-[#EAF3F1]">
            <li>• Secure & verified access</li>
            <li>• Role-based dashboards</li>
            <li>• Transparent loan tracking</li>
            <li>• Responsive & user-friendly UI</li>
          </ul>

          <p className="mt-8 text-sm text-[#CFE3DD]">
            New to LoanLink?
            <Link
              to="/register"
              className="ml-1 font-semibold text-[#B6E04C] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-center text-[#1C2B27] mb-6">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#1C2B27]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-sm font-semibold text-[#1C2B27]">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] cursor-pointer text-[#6B7C75]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {errors.password?.type === "minLength" && (
                <p className="text-xs text-red-500 mt-1">
                  Password must be at least 6 characters
                </p>
              )}

              <div className="text-right mt-2">
                <Link
                  to="/forget-password"
                  state={{ email: emailValue }}
                  className="text-xs text-[#1F4F45] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-md font-semibold text-[#1C2B27]
              bg-[#B6E04C] hover:bg-[#A4D63A] transition"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* Mobile Register */}
          <p className="text-center mt-6 text-sm text-[#6B7C75] md:hidden">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 font-semibold text-[#1F4F45] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
