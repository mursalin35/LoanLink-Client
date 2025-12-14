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
import Profile from "../pages/Dashboard/MyProfile";
import ApprovedApplications from "../pages/Dashboard/Manager/ApprovedApplications";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminAllLoans from "../pages/Dashboard/Admin/AllLoan";
import LoanApplications from "../pages/Dashboard/Admin/LoanApplications";
import ManagerRoute from "./LocalRoutes/ManagerRoute";
import AdminRoute from "./LocalRoutes/AdminRoute";
import PrivateRoute from "./PrivateRoute";
import Overview from "../pages/Dashboard/Overview";
import PaymentSuccess from "../pages/Dashboard/User/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/User/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import ForgetPassword from "../pages/Auth/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "all-loans",
        element: <AllLoans />,
      },
      {
        path: "all-loans/:id",
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },
      { path: "application/:id", element: <Application /> },
    ],
  },

  // Auth routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword/> },
    ],
  },

  // Dashboard (private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user routes
      { index: true, element: <Overview /> }, // /dashboard
      { path: "profile", element: <Profile /> },
      { path: "my-loans", element: <MyLoans /> },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel />,
      },

      // Manager routes
      {
        path: "add-loan",
        element: (
          <ManagerRoute>
            <AddLoan />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <ManagerRoute>
            <ManageLoans />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <ManagerRoute>
            <PendingApplications />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <ManagerRoute>
            <ApprovedApplications />
          </ManagerRoute>
        ),
      },

      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-loan",
        element: (
          <AdminRoute>
            <AdminAllLoans />
          </AdminRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <AdminRoute>
            <LoanApplications />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
