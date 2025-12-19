import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://loanlink-server-bd.vercel.app",
  // baseURL: "http://localhost:3000",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
