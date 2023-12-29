import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  clearDeleteStatus,
  clearError,
  deleteOrder,
  fetchOrdersAdmin,
} from "../Redux/AdminProductsSlice";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

const Orders = () => {
  const {
    error: orderError,
    loading,
    orders,
  } = useSelector((state) => state.admin);
  const { error: deleteError, isDeleted } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const alert = useAlert();
  const DeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrdersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderError) {
      alert.error(orderError);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch(clearDeleteStatus());
      navigate("/admin/orders");
    }
  }, [orderError, isDeleted, alert, deleteError, navigate, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen mt-24">
      <MetaData title="Admin - All Orders" />

      <div className="md:col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="md:col-span-4 flex flex-col items-center justify-start gap-6 p-6">
        <h2 className="font-bold text-2xl">All Orders</h2>

        {loading ? (
          <Loader />
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto max-w-full">
            <table className="w-full font-bold">
              <thead>
                <tr
                  className="text-white"
                  style={{ backgroundColor: "tomato" }}
                >
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Items Qty</th>
                  <th className="border px-4 py-2">Price (INR)</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product._id}</td>
                    <td
                      className={`border px-4 py-2 ${
                        product.orderStatus === "Delivered"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    >
                      {product.orderStatus}
                    </td>
                    <td className="border px-4 py-2">
                      {product.orderItems.length}
                    </td>
                    <td className="border px-4 py-2">
                      ₹{product.totalPrice.toLocaleString("en-IN")}
                    </td>
                    {/* Add action buttons or links as needed */}
                    <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                      <Link to={`/admin/update/order/${product._id}`}>
                        <MdEdit className="text-blue-700 z-[200]" />
                      </Link>

                      {/* Add deletion logic or link here */}
                      <MdDelete
                        className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                        onClick={() => DeleteOrder(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-2xl text-gray-500 font-bold">No Orders Found</h2>
        )}
      </div>
    </div>
  );
};

export default Orders;
