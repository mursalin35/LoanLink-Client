import React from "react";

import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className=" bg-orange-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
