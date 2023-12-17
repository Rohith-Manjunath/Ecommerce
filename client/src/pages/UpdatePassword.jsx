import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";

const UpdatePassword = () => {
  const { error, success, loading, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ formData }));
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
        <div className="flex items-center justify-center h-[100vh] w-[100vw]">
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="oldPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Old Password:
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
