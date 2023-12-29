import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const Success = () => {
  return (
    <div className="text-center mt-10 flex items-center justify-center h-[100vh] flex-col gap-2">
      <MetaData title="Payment Success" />

      <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
      <p className="text-lg mb-6">
        Thank you for your purchase. Your payment was successful.
      </p>
      <Link
        to="/myorders"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 font-semibold"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default Success;
