import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const useAuth = () => {
  const authIfo = useContext(AuthContext);
  return authIfo;
};

export default useAuth;
