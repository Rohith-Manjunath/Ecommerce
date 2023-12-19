import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrdersDispatch } from "../Redux/MyOrders";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders, error, loading } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const alert = useAlert();
  console.log(orders);

  useEffect(() => {
    dispatch(OrdersDispatch());
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-screen p-20">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Total Items</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{order._id}</td>
                  <td
                    className={`p-2 ${
                      order.orderStatus === "Delivered"
                        ? "text-green-500"
                        : "text-blue-500"
                    }`}
                  >
                    {order.orderStatus}
                  </td>
                  <td className="p-2">{order.orderItems.length}</td>

                  <td className="p-2">&#8377;{order.totalPrice.toFixed(2)}</td>
                  <td className="p-2 hover:scale-105 transition-all duration-200 hover:text-blue-500">
                    <Link to={`/order/details/${order._id}`}>
                      <FaExternalLinkAlt className="text-[15px]" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyOrders;
