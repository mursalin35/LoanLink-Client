import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // const [wrongAttempts, setWrongAttempts] = useState(0);

  // React hook from
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const emailValue = watch("email");

  // -------------------------------
  //   🔑 HANDLE LOGIN SUBMIT
  // -------------------------------
  const handleLogin = (data) => {
    console.log("form data", data);
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful! 🎉");
        navigate(location?.state || "/");
      })
      .catch((error) => { 
        console.log(error);
           toast.error(error.message || "Login failed!");
      });
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 sm:px-6 ">
      <title>LogIn</title>

      <div className="bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full sm:w-8/12 md:w-6/12 lg:w-4/12 border border-[#DAD7FF]/60 dark:border-[#3D3A64]">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#632ee3] to-[#00b8b0] bg-clip-text text-transparent text-center mb-6">
          <span className="text-[#1F1F2E] dark:text-[#EDEBFF]">Login</span> Page
        </h2>

        {/* -------------------------------
           FORM START (React Hook Form)
        -------------------------------- */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[#2E1F47] dark:text-[#EDEBFF] mb-1 font-semibold">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3]"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="relative">
            <label className="block text-[#2E1F47] dark:text-[#EDEBFF] mb-1 font-semibold">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3]"
            />

            <span
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500 dark:text-[#B0B3C6]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {/* Password Error masage  */}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">
                Password must be 6 characters
              </p>
            )}
            {/* Forgot Password */}
            <p className="text-right text-xs mt-2 text-gray-600 dark:text-[#B0B3C6]">
              <Link
                to="/forget-password"
                state={{ email: emailValue }}
                className="hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center mt-5 text-gray-600 dark:text-[#B0B3C6]">
          Don’t have an account?
          <Link
            state={location.state}
            className="text-[#632EE3] font-semibold ml-1 hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>

        <SocialLogin />
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
