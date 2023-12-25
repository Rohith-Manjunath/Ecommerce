import Sidebar from "./Sidebar";
import Chart from "chart.js/auto";
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
    <div className="w-[100vw] h-screen grid grid-cols-5 pt-[7rem]">
      <div className="col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4 flex items-center justify-start flex-col gap-6 ">
        <div className="col-span-4 flex items-center justify-start flex-col gap-6">
          <h2 className="font-bold text-2xl">All Users</h2>
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full font-bold">
              <thead>
                <tr
                  className=" text-white"
                  style={{ backgroundColor: "tomato" }}
                >
                  <th className="border px-4 py-2 ">User ID</th>
                  <th className="border px-4 py-2 ">Email</th>
                  <th className="border px-4 py-2 ">Role</th>
                  <th className="border px-4 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((product) => (
                  <tr key={product.id}>
                    <td className="border px-4 py-2 ">{product._id}</td>
                    <td className="border px-4 py-2 ">{product.email}</td>
                    <td
                      className={`border px-4 py-2 ${
                        product.role === "admin"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    >
                      {product.role}
                    </td>

                    <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                      <Link to={`/admin/update/user/${product._id}`}>
                        <MdEdit className="text-blue-700 z-[200]" />
                      </Link>

                      <MdDelete
                        onClick={() => DeleteUser(product._id)}
                        className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
