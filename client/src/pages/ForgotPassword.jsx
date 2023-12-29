import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../Redux/userSlice";
import Loader from "../layouts/Loader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MetaData from "../layouts/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { error, message } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (message) {
      alert.success(message, {
        timeout: 5000,
        type: "success",
      });
      // Optionally, navigate to a different page after successful submission
      navigate("/login");
    } else if (error) {
      alert.error(error, {
        timeout: 5000,
        type: "error",
      });
    }
  }, [message, error, alert, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <MetaData title="Forgot Password" />

          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  size="small"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="hover:bg-blue-600 transition duration-300"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
