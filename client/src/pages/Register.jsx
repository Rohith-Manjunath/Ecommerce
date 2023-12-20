import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/userSlice";
import Loader from "../layouts/Loader";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { error, message, loading } = useSelector((state) => state.user);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({ formData, avatarPic })); // Include avatar in the object
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
          <form
            className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Photo
              </label>

              <div className="flex items-center">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-white border border-gray-300 rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2 px-4 rounded-md shadow-sm inline-flex items-center"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 4v16m8-8H4"></path>
                  </svg>
                  Upload
                </label>
                <input
                  id="fileInput"
                  type="file"
                  name="avatar"
                  onChange={handleInputChange}
                  className="hidden"
                  accept="image/*"
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
            </div>
            <div className="flex items-start justify-center flex-col gap-2">
              <button
                type="submit"
                className="w-full tracking-wider bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
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
