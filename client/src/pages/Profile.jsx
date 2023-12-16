import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { loadUser } from "../Redux/userSlice";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdateProfile = () => {
    // Add logic to navigate to the update profile page
    console.log("Navigate to update profile page");
  };

  const handleMyOrders = () => {
    // Add logic to navigate to the my orders page
    console.log("Navigate to my orders page");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[80vw] h-[80vh] flex items-center justify-center mx-auto border shadow-lg mt-[6rem] rounded-md">
          <div className="w-1/2 h-full flex items-center justify-center flex-col gap-5">
            <img
              src={user.avatar.url}
              alt=""
              className="w-[10rem] h-[10rem] rounded-full"
            />
            <Link
              to={"/update/profile"}
              className="bg-orange-500 text-center text-white rounded-sm p-2 font-semibold w-1/2"
            >
              Update Profile
            </Link>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center gap-5 flex-col">
            <h3 className="font-semibold">
              Full Name : <span className="text-slate-500">{user.name}</span>
            </h3>
            <p className="font-semibold">
              Email : <span className="text-slate-500">{user.email}</span>
            </p>
            <span>
              Joined on:{" "}
              <span className="text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </span>
            <div className="flex w-full items-center justify-center gap-5">
              <button className="p-2 w-1/3 bg-slate-700 text-white font-semibold rounded-sm">
                Orders
              </button>
              <Link
                to={"/update/password"}
                className=" text-center p-2 w-1/3 bg-slate-700 text-white font-semibold rounded-sm"
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
