import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchOrdersAdmin,
  fetchProductsAdmin,
  fetchUsersAdmin,
} from "../Redux/AdminProductsSlice";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";

const AdminDashboard = () => {
  const {
    products,
    orders,
    users,
    loading,
    error: productsError,
  } = useSelector((state) => state.admin);
  const { error: ordersError } = useSelector((state) => state.admin);
  const { error: usersError } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const totalAmount =
    orders &&
    orders.reduce((accumulator, order) => accumulator + order.totalPrice, 0);

  const outOfStockCount = products.reduce(
    (count, item) => (item.stock === 0 ? count + 1 : count),
    0
  );

  const initialState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Initial Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgba(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00a6b4", "#640094"],
        data: [outOfStockCount, products.length - outOfStockCount],
        hoverBackgroundColor: ["#4b5000", "35014f"],
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchProductsAdmin());
    dispatch(fetchUsersAdmin());
    dispatch(fetchOrdersAdmin());
  }, [dispatch]);

  const alert = useAlert();

  useEffect(() => {
    if (productsError) {
      alert.error(`Error fetching products: ${productsError}`);
      dispatch(clearError());
    }
  }, [productsError, alert, dispatch]);

  useEffect(() => {
    if (ordersError) {
      alert.error(`Error fetching orders: ${ordersError}`);
      dispatch(clearError());
    }
  }, [ordersError, alert, dispatch]);

  useEffect(() => {
    if (usersError) {
      alert.error(`Error fetching users: ${usersError}`);
      dispatch(clearError());
    }
  }, [usersError, alert, dispatch]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-[100vw] h-screen grid grid-cols-5 pt-[7rem]">
      <div className="col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4 flex items-center justify-center flex-col gap-6 ">
        <h2 className="text-slate-500 text-2xl">Dashboard</h2>
        <p className="font-bold bg-blue-600 text-white p-6 w-1/2 text-center">
          Total Amount: {totalAmount}
        </p>
        <div className="inline mt-5">
          <Link
            to={"/admin/products"}
            className="p-5 mx-5 bg-red-500 text-white font-bold rounded-full"
          >
            Products: {products && products.length}
          </Link>
          <Link
            to={"/admin/orders"}
            className="p-5 mx-5 bg-yellow-300 text-black font-bold rounded-full"
          >
            Orders: {orders && orders.length}
          </Link>
          <Link
            to={"/admin/users"}
            className="p-5 mx-5 bg-gray-800 text-white font-bold rounded-full"
          >
            Users: {users && users.length}
          </Link>
        </div>
        <div className="w-[60%] mt-10">
          <Line data={initialState} />
        </div>
        <div className="">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
