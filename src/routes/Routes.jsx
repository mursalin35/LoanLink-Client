import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import AllLoans from "../pages/Loans/AllLoans";
import About from "../pages/AboutUs/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import LoanDetails from "../pages/Loans/LoanDetails";
import DashboardLayout from "../layout/DashboardLayout";
import MyLoans from "../pages/Dashboard/User/MyLoans";
import PendingApplications from "../pages/Dashboard/Manager/PendingApplications";
import Application from "../pages/Loans/ApplyLoan";
import Profile from "../pages/Dashboard/Manager/MyProfile";
import ApprovedApplications from "../pages/Dashboard/Manager/ApprovedApplications";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "all-loans", element: <AllLoans /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "all-loans/:id",
        element: <LoanDetails />,
      },
      {
        path: "/application/:id",
        element: <Application />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "my-loans", element: <MyLoans /> },
      // { path: "pending-applications", element: <PendingApplications /> }, // Manager only
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "add-loan", element: <AddLoan /> }, // manager
      { path: "manage-loans", element: <ManageLoans /> }, // manager
      { path: "pending-loans", element: <PendingApplications /> }, // manager
      { path: "approved-loans", element: <ApprovedApplications /> }, // manager
      { path: "profile", element: <Profile /> },
      // ... other admin routes
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      // Auth pages (public)
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
