import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";
import { GetSingleOrder } from "../Redux/SingleOrderSlice";

const SIngleOrderDetails = () => {
  const { item, loading, error } = useSelector((state) => state.singleorder);
  const { shippingInfo } = item;
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const alert = useAlert();

  useEffect(() => {
    dispatch(GetSingleOrder({ id }));
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, alert, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-col gap-10 pt-10 mt-[4rem] p-10">
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
                className={`text-gray-700 ${
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
      )}
    </>
  );
};

export default SIngleOrderDetails;
