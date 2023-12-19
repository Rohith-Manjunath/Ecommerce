import { useAlert } from "react-alert";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem("userData");
  const alert = useAlert();
  if (!auth) {
    alert.error("Please login to access this resource");
  }

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
