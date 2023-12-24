import Sidebar from "./Sidebar";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersAdmin,
  fetchProductsAdmin,
  fetchUsersAdmin,
} from "../Redux/AdminProductsSlice";
import Loader from "../layouts/Loader";

const AdminDashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, orders, users, error, loading, totalAmount } = useSelector(
    (state) => state.adminProducts
  );

  const outOfStock = products.reduce((a, item) => {
    return item.stock === 0 ? a + 1 : a;
  }, 0);

  const initialState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Initial Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgba(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00a6b4", "#640094"],
        data: [outOfStock, products.length - outOfStock],
        hoverBackgroundColor: ["#4b5000", "35014f"],
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchProductsAdmin());
    dispatch(fetchUsersAdmin());
    dispatch(fetchOrdersAdmin());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[100vw] h-screen grid grid-cols-5 pt-[7rem]">
          <div className="col-span-1 flex items-center justify-center">
            <Sidebar />
          </div>
          <div className="col-span-4 flex items-center justify-center flex-col gap-6 ">
            <h2 className="text-slate-500 text-2xl">Dashboard</h2>
            <p className="font-bold bg-blue-600 text-white p-6 w-1/2 text-center">
              Total Amount : {totalAmount}
            </p>
            <div className="inline mt-5">
              <span className="p-5 mx-5 bg-red-500 text-white font-bold rounded-full">
                Products : {products.length}
              </span>
              <span className="p-5 mx-5 bg-yellow-300 text-black font-bold rounded-full">
                Orders :
              </span>
              <span className="p-5 mx-5 bg-gray-800 text-white font-bold rounded-full">
                Users : {users.length}
              </span>
            </div>
            <div className="w-[60%] mt-10">
              <Line data={initialState} />
            </div>
            <div className="">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
