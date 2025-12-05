import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://finease-server-bd.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor (firebase accessToken)
    const reqInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response Interceptor
    const resInterceptor = instance.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.log("Unauthorized user. Logging out...");
          signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
