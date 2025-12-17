import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  // -------------------------------
  // React Hook Form
  // -------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // -------------------------------
  // Password Validation
  // -------------------------------
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must have at least 1 uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must have at least 1 lowercase letter";
    return true;
  };

  // -------------------------------
  // Handle Register Submit
  // -------------------------------
  const handleRegister = async (data) => {
    try {
      const profileImage = data.photo[0];

      const create = await createUser(data.email, data.password);
      const user = create.user;

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImage);
      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      );
      const photoURL = imageRes.data.data.url;

      // Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // Save user in MongoDB
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: data.name,
        email: data.email,
        photoURL,
        role: data.role, // user / manager
      });

      toast.success("Account created successfully! 🎉");
      navigate(location.state || "/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to register");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-0">
      <title>Register</title>

      <div className="bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 border border-[#DAD7FF]/60 dark:border-[#3D3A64]">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#632ee3] to-[#00b8b0] bg-clip-text text-transparent text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Photo Upload */}
          <input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="file-input w-full p-2 border rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />
          {errors.photo && (
            <p className="text-red-500 text-xs">{errors.photo.message}</p>
          )}

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          {/* Role Dropdown */}
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#632EE3]"
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs">{errors.role.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
              })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#632EE3]"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] text-white py-2 rounded-md hover:opacity-90 transition font-medium"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link
            state={location.state}
            className="text-[#632EE3] font-semibold ml-1 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
         <SocialLogin />
      </div>
    
      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
