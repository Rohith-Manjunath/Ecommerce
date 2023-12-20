import { useAlert } from "react-alert";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const auth = JSON.parse(localStorage.getItem("userData"));
  const alert = useAlert();

  if (auth.role === "user") {
    alert.error("You can't access this resource");
  }

  return auth.role === "admin" ? <Outlet /> : <Navigate to="/products" />;
};

export default AdminProtected;
