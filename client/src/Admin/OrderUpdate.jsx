import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  clearError,
  clearUpdateStatus,
  updateOrderStatus,
} from "../Redux/AdminProductsSlice";

const OrderUpdate = () => {
  const { orders, loading, error, isUpdated } = useSelector(
    (state) => state.admin
  );
  const { error: updateError } = useSelector((state) => state.admin);
  const params = useParams();
  const { id } = params;
  const item = orders.find((item) => item._id === id);
  const { shippingInfo } = item;
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const alert = useAlert();

  const updateOrder = (id) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      navigate("/admin/orders");
      dispatch(clearUpdateStatus());
    }
  }, [error, updateError, isUpdated, alert, dispatch, navigate]);

  return (
    <div className="w-[100vw] h-screen grid grid-cols-7 pt-[7rem]">
      <div className="col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4">
        <div className="w-full h-full flex flex-col gap-10 pt-10 p-10">
          <h3 className="text-[15px] text-red-500 sm:text-3xl md:text-3xl">
            Order #{id}
          </h3>
          <div className="felx flex-col">
            <h2 className="mb-3 font-bold text-[18px]  md:text-xl  text-gray-600">
              Shipping Info :{" "}
            </h2>
            <div className="flex flex-col items-start justify-start gap-4">
              <h3 className="text-gray-700">
                {" "}
                <span className="font-bold text-black ">Name : </span>
                {item.user.name}
              </h3>
              <p className="text-gray-700">
                <span className="font-bold text-black ">Address : </span>
                {shippingInfo.address}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-black ">Phone : </span>
                {item.phoneNo}
              </p>
            </div>
          </div>
          <div className="felx flex-col">
            <h2 className="mb-3 font-bold text-[18px] sm:text-[22px] md:text-xl text-gray-600">
              Payment :{" "}
            </h2>
            <div className="flex flex-col items-start justify-start gap-4">
              <span className="font-bold text-green-500">PAID</span>

              <p className="text-gray-700">
                <span className="font-bold text-black ">Amount : </span>
                &#8377;{item.totalPrice}
              </p>
            </div>
          </div>
          <div className="felx flex-col">
            <h2 className="mb-3 font-bold text-[18px] sm:text-[22px] md:text-xl text-gray-600">
              Order Status :{" "}
            </h2>
            <div className="flex flex-col items-start justify-start gap-4">
              <p
                className={` ${
                  item.orderStatus === "Delivered"
                    ? "text-green-500"
                    : "text-blue-400"
                } font-bold`}
              >
                {item.orderStatus}
              </p>
              {item.orderStatus === "Delivered" && (
                <p className={`text-[15px] tracking-wide`}>
                  <span className="font-bold">Delivered on : </span>
                  {new Date(item.deliveredAt).toString()}
                </p>
              )}
            </div>
          </div>
          <div className="felx flex-col items-center justify-center max-h-[200px] overflow-y-scroll">
            <h2 className="mb-3 font-bold text-[18px] sm:text-[22px] md:text-xl text-gray-600">
              Items :
            </h2>
            {item.orderItems.map((orderItem) => (
              <div
                key={orderItem._id}
                className="flex items-start justify-between flex-col gap-5 sm:flex-row sm:items-center mt-5 "
              >
                <img
                  src={orderItem.image}
                  alt={orderItem.name}
                  className="w-[6rem] h-[7rem] rounded-md"
                />
                <p className="font-bold">
                  {orderItem.quantity} x {orderItem.price} ={" "}
                  {orderItem.quantity * orderItem.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        {item.orderStatus !== "Delivered" && (
          <div className={` pt-[5rem] pr-[2rem] col-span-1`}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {item.orderStatus === "Processing" && (
                <MenuItem value="Shipped">Shipped</MenuItem>
              )}
              {item.orderStatus === "Shipped" && (
                <MenuItem value="Delivered">Delivered</MenuItem>
              )}
            </TextField>
            <button
              onClick={() => updateOrder(item._id)}
              className="bg-orange-500 font-bold text-center text-white w-full p-2 mt-5 rounded-md hover:bg-red-600"
            >
              Update Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderUpdate;
