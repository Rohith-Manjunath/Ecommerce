import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "../layouts/Loader";
import {
  clearDeleteStatus,
  clearError,
  deleteUser,
  fetchUsersAdmin,
} from "../Redux/AdminProductsSlice";
import MetaData from "../layouts/MetaData";

const Users = () => {
  const { error, loading, users } = useSelector((state) => state.admin);
  const { error: deleteError, isDeleted } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const DeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch(clearDeleteStatus());
    }
  }, [error, isDeleted, alert, deleteError, navigate, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center mt-24 md:flex-row">
      <MetaData title="Admin - All Users" />

      <div className="flex items-center justify-center w-full md:w-[20%]">
        <Sidebar />
      </div>
      <div className="flex items-center justify-start flex-col gap-6 mt-10 w-full md:w-[80%] overflow-x-scroll">
        <div className="col-span-4 flex items-center justify-start flex-col gap-6 overflow-x-auto mx-auto">
          <h2 className="font-bold text-2xl">All Users</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="w-screen overflow-x-auto md:w-full">
              <table className="w-full font-bold text-[12px] md:text-[15px]">
                <thead>
                  <tr
                    className="text-white"
                    style={{ backgroundColor: "tomato" }}
                  >
                    <th className="border px-4 py-2">User ID</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="border px-4 py-2">{user._id}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td
                        className={`border px-4 py-2 ${
                          user.role === "admin"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {user.role}
                      </td>

                      <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                        <Link to={`/admin/update/user/${user._id}`}>
                          <MdEdit className="text-blue-700 z-[200]" />
                        </Link>

                        <MdDelete
                          onClick={() => DeleteUser(user._id)}
                          className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
