import React from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user && user.email) {
    return children;
  }

  // navigate login
  return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  // return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
