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
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminAllLoans from "../pages/Dashboard/Admin/AllLoan";
import LoanApplications from "../pages/Dashboard/Admin/LoanApplications";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "all-loans",
        element: (
          <PrivateRoute>
            <AllLoans />
          </PrivateRoute>
        ),
      },
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
// -----------------------------------------------------------------------------
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      // Auth pages (public)
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
// -----------------------------------------------------------------------------

// User Profile 
  {
    path: "/dashboard",
    element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
    children: [
      { path: "my-loans", element: <MyLoans /> },
      { path: "profile", element: <Profile /> },
      // { path: "pending-applications", element: <PendingApplications /> }, // Manager only
    ],
  },








// manager route
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "add-loan", element: <AddLoan /> }, // manager
      { path: "manage-loans", element: <ManageLoans /> }, // manager
      { path: "pending-loans", element: <PendingApplications /> }, // manager
      { path: "approved-loans", element: <ApprovedApplications /> }, // manager
     
     
    ],
  },
  // Admin router
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // other dashboard routes...
      {
        path: "manage-users",
        element: (
          // <AdminRoute>
          <ManageUsers />
          // </AdminRoute>
        ),
      },
      {
        path: "all-loan",
        element: (
          // <AdminRoute>
          <AdminAllLoans />
          // </AdminRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          //  <AdminRoute>
          <LoanApplications />
          //  </AdminRoute>
        ),
      },
      
    ],
  },
]);

export default router;
