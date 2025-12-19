import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter";
    return true;
  };

  const handleRegister = async (data) => {
    try {
      const imageFile = data.photo[0];

      const result = await createUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", imageFile);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );

      const photoURL = imageRes.data.data.url;

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: data.name,
        email: data.email,
        photoURL,
        role: data.role,
      });

      toast.success("Welcome to LoanLink 🎉");
      navigate(location?.state || "/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-8 md:mt-11 px-4">
      <title>Register</title>

      {/* Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E2E8E6]">

        {/* LEFT INFO (SAME AS LOGIN) */}
<div className="hidden md:flex flex-col justify-center p-10 bg-[#1F4F45] text-white">
  <h1 className="text-3xl font-bold mb-4">
    Join <span className="text-[#B6E04C]">LoanLink</span>
  </h1>

  <p className="text-sm leading-relaxed text-[#D8E6E2] mb-6">
   Create your LoanLink account to seamlessly request microloans, monitor approval status in real-time, 
  manage your personal and financial information, and access role-based dashboards tailored to borrowers, 
  managers, or admins. Enjoy full transparency, secure data handling, and an intuitive platform designed to 
  make your loan experience fast, reliable, and hassle-free.
  </p>

  <ul className="space-y-3 text-sm text-[#EAF3F1]">
    <li>• Secure account creation with encrypted credentials</li>
    <li>• Borrower & manager roles for tailored experience</li>
    <li>• Fast, transparent, and reliable loan processing</li>
    <li>• Real-time notifications and updates</li>
    <li>• Modern, responsive UI for desktop & mobile</li>
    <li>• View detailed loan history & repayment schedules</li>
    <li>• Dedicated support for any queries or issues</li>
  </ul>

  <p className="mt-8 text-sm text-[#CFE3DD]">
    Already have an account?
    <Link
      to="/login"
      className="ml-1 font-semibold text-[#B6E04C] hover:underline"
    >
      Login here
    </Link>
  </p>
</div>


        {/* RIGHT FORM (SAME STRUCTURE AS LOGIN) */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-center text-[#1C2B27] mb-6">
            Create your account
          </h2>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">


            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#1C2B27]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>


            {/* Photo */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#1C2B27]">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              />
              {errors.photo && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>


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

            {/* Role */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#1C2B27]">
                Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.role.message}
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
                {...register("password", {
                  required: true,
                  validate: validatePassword,
                })}
                className="w-full px-4 py-3 rounded-md border border-[#DDE5E2]
                focus:outline-none focus:ring-2 focus:ring-[#6FBF73]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] cursor-pointer text-[#6B7C75]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-md font-semibold text-[#1C2B27]
              bg-[#B6E04C] hover:bg-[#A4D63A] transition"
            >
              Register
            </button>
          </form>

          {/* Social */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* Mobile Login */}
          <p className="text-center mt-6 text-sm text-[#6B7C75] md:hidden">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-semibold text-[#1F4F45] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
