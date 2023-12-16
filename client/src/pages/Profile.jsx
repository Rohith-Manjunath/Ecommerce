import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const handleUpdateProfile = () => {
    // Add logic to navigate to the update profile page
    console.log("Navigate to update profile page");
  };

  const handleMyOrders = () => {
    // Add logic to navigate to the my orders page
    console.log("Navigate to my orders page");
  };

  return (
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
          <button className="p-2 w-1/3 bg-slate-700 text-white font-semibold rounded-sm">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
