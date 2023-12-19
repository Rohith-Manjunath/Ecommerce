import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";
import { loginUser } from "../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

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
    console.log("Form Data:", formData);
    dispatch(loginUser({ formData }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
      navigate("/");
    } else if (error) {
      alert.error(error, {
        timeout: 5000,
        type: "error",
      });
    }
  }, [message, error, alert, navigate, isAuthenticated]);

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
              <label
                htmlFor="email"
                className="block text-gray-800 text-lg font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[16px]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-800 text-lg font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[16px]"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-[16px]"
              >
                Login
              </button>
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
