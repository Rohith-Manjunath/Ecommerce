import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";
import { useEffect } from "react";
import { loadUser } from "../Redux/userSlice";
import MetaData from "../layouts/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMyOrders = () => {
    navigate("/myorders");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full p-5  h-auto md:h-[80vh] flex flex-col md:flex-row items-center justify-center mx-auto border shadow-lg mt-[6rem] rounded-md">
          <MetaData title="User Profile" />

          <div className="w-1/2 h-full flex items-center justify-center flex-col gap-5">
            <img
              src={user.avatar.url}
              alt=""
              className="w-[10rem] md:w-[12rem] rounded-full"
            />
            <Link
              to={"/update/profile"}
              className="bg-orange-500 text-center text-white rounded-sm p-2 font-semibold w-full md:w-1/2"
            >
              Update Profile
            </Link>
          </div>
          <div className="md:w-1/2 h-full flex items-start justify-center gap-5 flex-col mt-10 md:mt-0">
            <h3 className="font-semibold">
              Full Name : <span className="text-slate-500">{user.name}</span>
            </h3>
            <p className="font-semibold">
              Email :{" "}
              <span className="text-slate-500 text-center text-[14px]">
                {user.email}
              </span>
            </p>
            <span>
              Joined on:{" "}
              <span className="text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </span>
            <div className="flex w-full items-center justify-center gap-5">
              <button
                onClick={handleMyOrders}
                className="p-2 w-1/3 bg-slate-700 text-white font-semibold rounded-sm"
              >
                Orders
              </button>
              <Link
                to={"/update/password"}
                className=" text-center p-2 w-full bg-slate-700 text-white font-semibold rounded-sm"
              >
                Update Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
