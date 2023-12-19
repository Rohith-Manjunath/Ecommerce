import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem("userData");

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
