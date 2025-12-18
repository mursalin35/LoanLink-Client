import React, { useEffect, useState } from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake initial loading (API / app boot)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // চাইলে কমবেশি করো

    return () => clearTimeout(timer);
  }, []);

  // 🔴 loading চলাকালীন কিছুই দেখাবে না
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d9f7ed] to-[#bae6da] dark:from-[#0D0D16] dark:to-[#1A1A2E]">
        <Spinner text="Loading LoanLink..." />
      </div>
    );
  }

  // ✅ loading শেষ হলে পুরো app
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
