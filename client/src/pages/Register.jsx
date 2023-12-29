import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../Redux/userSlice";
import Loader from "../layouts/Loader";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import MetaData from "../layouts/MetaData";

const Register = () => {
  const { error, success, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avtarPreview, setAvtarPreview] = useState("");
  const [avatarPic, setAvatarPic] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvtarPreview(reader.result);
          setAvatarPic(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert.success("Registration successful");
    dispatch(registerUser({ formData, avatarPic }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      resetError();
    }
    if (success) {
      navigate("/login");
    }
  }, [error, alert, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <MetaData title="Register" />

          <form
            className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3 mt-auto"
            onSubmit={handleSubmit}
          >
            <Typography className="text-gray-600" variant="h4">
              Register
            </Typography>

            <div className="mb-4">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                type="file"
                label="Photo"
                name="avatar"
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: "image/*",
                }}
              />
              {avtarPreview && (
                <img
                  src={avtarPreview}
                  alt="Preview"
                  className="rounded-full ml-2"
                  style={{ width: "40px", height: "40px" }}
                />
              )}
            </div>
            <div className="flex items-start justify-center flex-col gap-2">
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
              <span className="flex items-center justify-center gap-2 text-[14px] tracking-wide">
                Already a user?{" "}
                <Link
                  to={"/login"}
                  className="text-[13px] font-bold text-blue-700 hover:underline"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
