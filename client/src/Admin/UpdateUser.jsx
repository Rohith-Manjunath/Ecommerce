import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  clearError,
  clearUpdateStatus,
  fetchUsersAdmin,
  updateUserRole,
} from "../Redux/AdminProductsSlice";
import { Button, MenuItem, TextField } from "@mui/material";
import MetaData from "../layouts/MetaData";

const Products = () => {
  const params = useParams();
  const { id } = params;
  const { error, loading, users } = useSelector((state) => state.admin);
  const { error: updateError, isUpdated } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    // Fetch the specific user data based on the id
    const user = users.find((user) => user._id === id);

    // Pre-fill the form data
    if (user) {
      setFormData({
        name: user.name,
        role: user.role,
      });
    }
  }, [id, users]);

  useEffect(() => {
    dispatch(fetchUsersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(clearUpdateStatus());
    }
  }, [error, isUpdated, alert, updateError, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) return alert.error("All fields are required");
    dispatch(updateUserRole({ id, role: formData.role }));
  };

  return (
    <div className="w-[100vw] h-screen grid grid-cols-5 pt-[7rem]">
      <MetaData title="Admin - User Update" />

      <div className="col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4 flex items-center justify-start flex-col gap-6 ">
        <form onSubmit={handleSubmit} className="space-y-2">
          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            {formData.role === "admin" ? (
              <MenuItem value="user">User</MenuItem>
            ) : (
              <MenuItem value="admin">Admin</MenuItem>
            )}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
            className="w-full"
          >
            Update User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Products;
