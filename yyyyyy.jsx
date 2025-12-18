import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Spinner from "./src/components/Spinner";

const MainLayout = () => {
  const { loading } = useAuth(); // 🔑 real loading

  // 🔴 loading থাকলে NOTHING else render হবে না
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d9f7ed] to-[#bae6da] dark:from-[#0D0D16] dark:to-[#1A1A2E]">
        <Spinner text="Welcome our LoanLink..." />
      </div>
    );
  }

  // ✅ loading শেষ → পুরো layout
  return (
    <div className="bg-gradient-to-br from-[#d9f7ed] to-[#bae6da] dark:from-[#0D0D16] dark:to-[#1A1A2E] min-h-screen transition-colors">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
