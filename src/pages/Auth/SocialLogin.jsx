import React from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location =useLocation()
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
         toast.success("Signed in with Google!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
  );
};

export default SocialLogin;
