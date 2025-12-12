import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading, suspended } = useAuth();
  const location = useLocation();
  // console.log("location name",location)

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  if (suspended) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Account Suspended</h2>
          <p className="mb-4">
            Your account has been suspended. Please contact admin.
          </p>
        </div>
      </div>
    );
  }

  return children;
  // // navigate login
  // return <Navigate state={location?.pathname} to="/login"></Navigate>;
  // // return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;



// if (suspended) {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white p-6 rounded shadow text-center max-w-md">
//         <h2 className="text-2xl font-bold mb-2">Account Suspended</h2>
//         <p className="mb-2">Your account has been suspended.</p>
//         {suspendReason && (
//           <p className="text-red-600 font-medium">Reason: {suspendReason}</p>
//         )}
//       </div>
//     </div>
//   );
// }
