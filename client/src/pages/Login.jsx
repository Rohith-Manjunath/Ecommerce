import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import { loginUser, resetMessage } from "../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const alert = useAlert();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ formData }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      dispatch(resetMessage());
    }

    if (message) {
      alert.success(message, {
        timeout: 5000,
        type: "success",
      });
      setFormData({
        email: "",
        password: "",
      });
      dispatch(resetMessage());
      navigate("/");
    } else if (error) {
      alert.error(error, {
        timeout: 5000,
        type: "error",
      });
    }
  }, [message, error, alert, navigate, isAuthenticated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <form
            className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </div>
            <div className="mt-5 flex items-start justify-center flex-col gap-3">
              <Link
                className="text-[13px] font-bold text-blue-700 hover:underline"
                to={"/forgot/password"}
              >
                Forgot password
              </Link>
              <Link
                to={"/register"}
                className="text-[13px] font-bold text-blue-700 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
