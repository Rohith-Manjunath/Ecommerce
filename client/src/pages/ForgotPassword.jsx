import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../Redux/userSlice";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { error, message } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();

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
    } else if (error) {
      alert.error(error, {
        timeout: 5000,
        type: "error",
      });
    }
  }, [message, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
