import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // -------------------------------
  //      React Hook Form Setup
  // -------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // -------------------------------
  //     Password Validator
  // -------------------------------
  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least 1 uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least 1 lowercase letter.";
    return true;
  };

  // -------------------------------
  //      Handle Signup Submit
  // -------------------------------
  const onSubmit = (data) => {
    const { name, photo, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Account created successfully! 🎉");
            navigate("/");
          })
          .catch(() => {
            setUser(user);
            toast("Signed up, but profile not updated 🟡");
          });
      })
      .catch((error) => toast.error(error.message));
  };

  // -------------------------------
  //  Google Sign In Handler
  // -------------------------------
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Signed in with Google!");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-0">
      <title>SignUp</title>

      <div className="bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 border border-[#DAD7FF]/60 dark:border-[#3D3A64]">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#632ee3] to-[#00b8b0] bg-clip-text text-transparent text-center mb-6">
          <span className="text-[#1F1F2E] dark:text-[#EDEBFF]">Create an</span>{" "}
          Account
        </h2>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          {/* PHOTO URL */}
          <input
            type="text"
            placeholder="Photo URL"
            {...register("photo")}
            className="w-full p-2 border text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:ring-2 focus:ring-[#632EE3]"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                validate: validatePassword,
              })}
              className="w-full p-2 border text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:ring-2 focus:ring-[#632EE3]"
            />

            {/* Show/Hide Icon */}
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-[#B0B3C6]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {/* PASSWORD ERROR */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] text-white py-2 rounded-md hover:opacity-90 transition font-medium"
          >
            Signup
          </button>
        </form>
        {/* LOGIN LINK */}
        <p className="text-center text-sm dark:text-[#B0B3C6] text-gray-600 mt-4">
          Already have an account?
          <Link to="/login">
            <span className="text-[#632EE3] dark:text-[#00E0C6] font-semibold cursor-pointer hover:underline ml-1">
              Login
            </span>
          </Link>
        </p>

        {/* DIVIDER */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
          <span className="mx-2 text-gray-500 dark:text-[#B0B3C6] text-sm">
            or
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-[#3D3A64] py-2 rounded-md text-[#2E1F47] dark:text-[#EDEBFF] hover:bg-[#F5F3FF] dark:hover:bg-[#3A3A4A]"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
