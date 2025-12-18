import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

const AdminRoute = ({ children }) => {
  const { role, loading } = useAuth();
  if (loading)
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};
export default AdminRoute;
