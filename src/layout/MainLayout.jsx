import React from "react";

import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-br from-[#d9f7ed] to-[#bae6da] dark:from-[#0D0D16] dark:to-[#1A1A2E] min-h-screen transition-colors">
      <ScrollToTop />
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
