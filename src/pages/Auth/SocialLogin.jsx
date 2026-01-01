import React from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      //  Save user to DB (first time only)
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
      });

      toast.success("Signed in with Google!");
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div>
      {/* Divider */}
      <div className="flex items-center my-4 ">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border py-2 text-black dark:text-white rounded-md cursor-pointer"
      >
        <FcGoogle className="text-xl" /> Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
