import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, signInWithGoogle, setUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    setPasswordError("");

    login(email, password)
      .then((result) => {
        setUser(result.user);
        setWrongAttempts(0);
        toast.success("Login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        const attempts = wrongAttempts + 1;
        setWrongAttempts(attempts);
        if (attempts >= 4) {
          setPasswordError("Too many attempts. Click forgot!");
        } else {
          setPasswordError("Wrong password");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Signed in with Google!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 sm:px-6 ">
      <title>LogIn</title>
      <div className="bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full sm:w-8/12 md:w-6/12 lg:w-4/12 border border-[#DAD7FF]/60 dark:border-[#3D3A64]">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#632ee3] to-[#00b8b0] bg-clip-text text-transparent text-center mb-6">
          <span className="text-[#1F1F2E] dark:text-[#EDEBFF]">Login</span> Page
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[#2E1F47] dark:text-[#EDEBFF] mb-1 font-semibold text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3] text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] placeholder-gray-500 text-sm sm:text-base transition"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-[#2E1F47] dark:text-[#EDEBFF] mb-1 font-semibold text-sm sm:text-base">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3] text-[#1F1F2E] dark:text-[#EDEBFF] dark:bg-[#1F1F2E] placeholder-gray-500 text-sm sm:text-base transition"
              required
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500 dark:text-[#B0B3C6] text-lg hover:text-[#632EE3] transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {passwordError && (
            <p className="text-red-500 text-xs sm:text-sm">{passwordError}</p>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] text-white py-3 rounded-md hover:opacity-90 shadow-lg transition duration-300 text-sm sm:text-base font-semibold tracking-wide"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-[#B0B3C6] mt-3 hover:underline">
          <Link
            className="cursor-pointer"
            to="/forget-password"
            state={{ email }}
          >
            Forgot Password?
          </Link>
        </p>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
          <span className="mx-2 text-gray-500 dark:text-[#B0B3C6] text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-[#D3D0FA] dark:border-[#3D3A64] py-3 rounded-md text-[#2E1F47] dark:text-[#EDEBFF] hover:bg-[#F5F3FF] dark:hover:bg-[#3A3A4A] transition cursor-pointer text-sm sm:text-base font-medium"
        >
          <FcGoogle className="text-xl sm:text-2xl" /> Sign in with Google
        </button>

        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-[#B0B3C6] mt-5">
          Don’t have an account?
          <Link to="/register">
            <span className="text-[#632EE3] dark:text-[#00E0C6] font-semibold cursor-pointer hover:underline ml-1">
              Register
            </span>
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;


