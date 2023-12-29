import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../Redux/userSlice";
import { useAlert } from "react-alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MetaData from "../layouts/MetaData";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const params = useParams();
  const token = params.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector((state) => state.user);

  const alert = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ formData, token }));
  };

  useEffect(() => {
    if (message) {
      alert.success(message, {
        timeout: 5000,
        type: "success",
      });
      setFormData({
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } else if (error) {
      alert.error(error, {
        timeout: 5000,
        type: "error",
      });
    }
  }, [message, error, alert, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <MetaData title="Reset Password" />

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            type="password"
            id="password"
            name="password"
            label="New Password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />

          <TextField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
