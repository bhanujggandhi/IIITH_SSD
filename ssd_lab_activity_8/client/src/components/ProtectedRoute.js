// import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useJwt } from "react-jwt";

export default ({ children }) => {
  // const { login } = useAuth();
  const token = window.localStorage.getItem("token");

  const { decodedToken, isExpired } = useJwt(token);
  console.log(decodedToken);
  // login();
  console.log(token);
  // if (!user) {
  //   return <Navigate to='/' />;
  // }
  return children;
};
