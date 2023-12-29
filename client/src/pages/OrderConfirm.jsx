import { useSelector } from "react-redux";
import CheckoutSteps from "../layouts/CheckoutSteps";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const shippingInfoData = JSON.parse(localStorage.getItem("shippingInfo"))
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {};
  const { phoneNo, address } = shippingInfoData;
  const items = useSelector((state) => state.cart.cart);

  const TotalPrice = items.reduce(
    (a, item) => a + item.price * item.quantity,
    0
  );

  const GSTPercentage = 18;
  const GSTAmount = (TotalPrice * GSTPercentage) / 100;

  const TotalWithGST = TotalPrice + GSTAmount;
  const shippingCharges = 0;

  const NavigateToPayment = () => {
    const orderInfo = {
      TotalPrice,
      shippingCharges,
      GSTAmount,
      TotalWithGST,
    };
    const orderInfoString = JSON.stringify(orderInfo);

    sessionStorage.setItem("orderInfo", orderInfoString);
    navigate("/order/payment");
  };

  return (
    <div className="flex items-center flex-col mt-[5rem] justify-start gap-10 h-[100vh] p-5 sm:items-start">
      <CheckoutSteps activeStep={1} />
      <div className="w-full h-auto flex items-center justify-center flex-col p-5 sm:justify-between md:w-1/2">
        <div className="w-full flex flex-col">
          <div className="flex items-start justify-center flex-col gap-3 px-10">
            <h2 className="font-semibold text-xl md:text-2xl">
              Shipping Info :{" "}
            </h2>
            <h3 className="font-semibold text-[15px]">
              Name : <span className="text-gray-500">{user.name}</span>
            </h3>
            <p className="font-semibold text-[15px]">
              Phone : <span className="text-gray-500">{phoneNo}</span>
            </p>
            <p className="font-semibold text-[15px]">
              Address : <span className="text-gray-500">{address}</span>{" "}
            </p>
          </div>
        </div>
        <div className="w-full flex-col md:px-10 mt-10">
          <h2 className="font-semibold text-xl md:text-2xl mb-5 text-center">
            Your Cart Items :{" "}
          </h2>
          <div className="max-h-[250px] overflow-y-scroll p-5 ">
            {items.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-5 items-center justify-between my-4"
                >
                  <img
                    src={item.imageURLs[0].url}
                    alt=""
                    height={60}
                    width={80}
                    className="rounded-md"
                  />
                  <span>
                    {item.quantity} x {item.price} ={" "}
                    <span className="font-semibold">
                      &#8377;
                      {(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex items-start justify-center flex-col md:px-10 mt-10 md:hidden">
          <h2 className="font-semibold text-xl md:text-2xl mb-3">
            Order Summary
          </h2>

          {/* Subtotal */}
          <div className="flex justify-between mb-2 w-full">
            <span>Subtotal:</span>
            <span>&#8377;{TotalPrice.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual subtotal value */}
          </div>

          {/* Shipping Charges */}
          <div className="flex justify-between mb-2 w-full">
            <span>Shipping Charges:</span>
            <span>&#8377;{shippingCharges.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual shipping charges value */}
          </div>

          {/* GST */}
          <div className="flex justify-between mb-2 w-full">
            <span>GST (18%):</span>
            <span>&#8377;{GSTAmount.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual GST value */}
          </div>

          {/* Total */}
          <div className="flex justify-between mb-4 w-full">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              {TotalWithGST.toLocaleString("en-IN")}
            </span>{" "}
            {/* Replace with your actual total value */}
          </div>

          {/* Submit Button */}
          <button
            style={{ backgroundColor: "tomato" }}
            onClick={NavigateToPayment}
            type="button"
            className="text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Proceed to payment
          </button>
        </div>

        <div className="items-start justify-center flex-col md:px-10 mt-10 md:flex hidden absolute w-1/2 right-0">
          <h2 className="font-semibold text-xl md:text-2xl mb-3">
            Order Summary
          </h2>

          {/* Subtotal */}
          <div className="flex justify-between mb-2 w-full">
            <span>Subtotal:</span>
            <span>&#8377;{TotalPrice.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual subtotal value */}
          </div>

          {/* Shipping Charges */}
          <div className="flex justify-between mb-2 w-full">
            <span>Shipping Charges:</span>
            <span>&#8377;{shippingCharges.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual shipping charges value */}
          </div>

          {/* GST */}
          <div className="flex justify-between mb-2 w-full">
            <span>GST (18%):</span>
            <span>&#8377;{GSTAmount.toLocaleString("en-IN")}</span>{" "}
            {/* Replace with your actual GST value */}
          </div>

          {/* Total */}
          <div className="flex justify-between mb-4 w-full">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              {" "}
              {TotalWithGST.toLocaleString("en-IN")}
            </span>{" "}
            {/* Replace with your actual total value */}
          </div>

          {/* Submit Button */}
          <button
            style={{ backgroundColor: "tomato" }}
            onClick={NavigateToPayment}
            type="button"
            className="font-bold tracking-widest text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
