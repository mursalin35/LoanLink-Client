import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("location name",location)

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>
  }

  return children;
  // // navigate login
  // return <Navigate state={location?.pathname} to="/login"></Navigate>;
  // // return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
