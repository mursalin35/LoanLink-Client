import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading, suspended } = useAuth();
  const location = useLocation();
  // console.log("location name",location)

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d9f7ed] to-[#bae6da] dark:from-[#0D0D16] dark:to-[#1A1A2E]">
        <Spinner text="Welcome our Dashboard..." />
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
