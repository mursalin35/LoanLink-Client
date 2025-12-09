import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import ScrollToTop from "../components/ScrollToTop";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-br from-[#F6FCFA]  to-[#EAF9F8] dark:from-[#0D0D16] dark:to-[#1A1A2E] min-h-screen transition-colors">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
