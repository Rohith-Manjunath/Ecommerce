import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { deleteOrder, fetchOrdersAdmin } from "../Redux/AdminProductsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const {
    orders: products,
    loading,
    message,
    error,
  } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const alert = useAlert();

  const DeleteProduct = (id) => {
    dispatch(deleteOrder(id));
    dispatch(fetchOrdersAdmin());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    } else if (message) {
      // Display the success message only when products are deleted
      alert.success(message);
    }
    dispatch(fetchOrdersAdmin());
  }, [error, alert, message, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[100vw] h-screen grid grid-cols-5 pt-[10rem]">
          <div className="col-span-1 flex items-start justify-center">
            <Sidebar />
          </div>
          <div className="w-[100vw] h-auto grid grid-cols-5 ">
            <div className="col-span-4 flex items-center justify-start flex-col gap-6">
              <h2 className="font-bold text-2xl">All Orders</h2>

              <table className="table-auto w-full ">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "tomato" }}
                  >
                    <th className="border px-4 py-2 ">Order ID</th>
                    <th className="border px-4 py-2 ">Status</th>
                    <th className="border px-4 py-2 ">Items Qty</th>
                    <th className="border px-4 py-2 ">Price (INR)</th>
                    <th className="border px-4 py-2 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="font-bold">
                      <td className="border px-4 py-2 ">{product._id}</td>
                      <td className="border px-4 py-2 ">
                        {product.orderStatus}
                      </td>
                      <td className="border px-4 py-2 ">
                        {product.orderItems.length}
                      </td>
                      <td className="border px-4 py-2 ">
                        ₹{product.totalPrice}
                      </td>
                      {/* Add action buttons or links as needed */}
                      <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                        <Link to={`/admin/update/order/${product._id}`}>
                          <MdEdit className="text-blue-700 z-[200]" />
                        </Link>

                        <MdDelete
                          className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                          onClick={() => DeleteProduct(product._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
