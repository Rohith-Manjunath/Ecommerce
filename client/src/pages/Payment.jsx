import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { NewOrder } from "../Redux/OrderSlice";
import { CiCreditCard1 } from "react-icons/ci";
import { RiPassExpiredFill } from "react-icons/ri";
import { IoMdKey } from "react-icons/io";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../layouts/CheckoutSteps";
import MetaData from "../layouts/MetaData";

const Payment = () => {
  const Amount = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { TotalWithGST } = Amount;
  const items = useSelector((state) => state.cart.cart);
  const shippingInfoData = JSON.parse(localStorage.getItem("shippingInfo"));
  const { address, phoneNo, state, country, pincode, city } = shippingInfoData;
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const order = {
    shippingInfo: {
      address,
      city,
      state: state.label,
      country: country.label,
      pinCode: pincode,
    },
    orderItems: items,
    phoneNo,
    paymentInfo: { id: "sample", status: "completed" },
    itemsPrice: TotalWithGST,
    taxPrice: 0, // Adjust according to your logic
    shippingPrice: 0, // Adjust according to your logic
    totalPrice: TotalWithGST,
    paidAt: new Date(),
  };

  const paymentData = {
    amount: Math.round(TotalWithGST * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      let data = await fetch(
        "https://ecommerce-ev4m.onrender.com/api/payment/checkout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: paymentData.amount }),
        }
      );
      data = await data.json();
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: address,
              city: city,
              state: state.value,
              postal_code: pincode,
              country: country.value,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          dispatch(NewOrder({ order }));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (e) {
      payBtn.current.disabled = false;
      alert.error(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen p-4 md:p-24 flex-col pt-24">
      <MetaData title="Payment" />

      <CheckoutSteps activeStep={3} />

      <div className="max-w-md mx-auto bg-white p-12 rounded-md shadow-md border border-slate-300">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "tomato" }}>
          Payment Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              <CiCreditCard1 className="inline-block mr-2 text-xl text-gray-500" />
              Card Number
            </label>
            <CardNumberElement className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>

          <div className="mb-4 flex">
            <div className="flex-1 mr-2">
              <label
                htmlFor="expiry"
                className="block text-sm font-medium text-gray-700"
              >
                <RiPassExpiredFill className="inline-block mr-2 text-xl text-gray-500" />
                Expiry
              </label>
              <CardExpiryElement className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div className="flex-1 ml-2">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                <IoMdKey className="inline-block mr-2 text-xl text-gray-500" />
                CVV
              </label>
              <CardCvcElement className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
          </div>

          <button
            style={{ backgroundColor: "tomato" }}
            ref={payBtn}
            type="submit"
            className="tracking-widest text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 font-semibold transition-all duration-300"
          >
            Pay {TotalWithGST.toLocaleString("en-IN")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
