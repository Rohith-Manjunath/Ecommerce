// UpdateProfile.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  resetError,
  resetSuccess,
  updateUserProfile,
} from "../Redux/userSlice";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { error, user, loading, success } = useSelector((state) => state.user);
  const alert = useAlert();
  const navigate = useNavigate();

  // Initial state for form fields
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert.success("Profile updated successfully");

    dispatch(updateUserProfile({ formData }));
    dispatch(loadUser());
    navigate("/profile");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(resetError());
    }
    if (success) {
      dispatch(resetSuccess());
    }
  }, [error, alert, dispatch, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <MetaData title="User Profile Update" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center vertically
              height: "100vh", // Full height of the viewport
            }}
          >
            <Typography component="h2" variant="h4">
              Update Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default UpdateProfile;
