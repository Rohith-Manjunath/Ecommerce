import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../Redux/userSlice";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { error, message, user, loading } = useSelector((state) => state.user);
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({ formData }));
  };

  useEffect(() => {
    if (message) {
      alert.success(message, {
        timeout: 5000,
        type: "success",
      });
      setFormData({
        email: "",
        password: "",
      });
      navigate("/profile");
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
        <div className="flex items-center justify-center h-screen flex-col">
          <MetaData title="User Profile Update" />

          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
