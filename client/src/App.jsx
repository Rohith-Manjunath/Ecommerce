import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetails from "./components/ProductDetails";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { store } from "./Redux/store";
import { useSelector } from "react-redux";
import UserOptions from "./layouts/UserOptions";
import { loadUser } from "./Redux/userSlice";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ShippingInfo from "./pages/ShippingInfo";
import OrderConfirm from "./pages/OrderConfirm";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import Success from "./pages/Success";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SIngleOrderDetails from "./pages/SIngleOrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import Users from "./Admin/Users";
import Reviews from "./Admin/Reviews";
import AdminProtected from "./components/AdminProtected";
import ProductsAdmin from "./Admin/Products";
import ProductUpdate from "./Admin/ProductUpdate";
import AdminOrders from "./Admin/Orders";
import OrderUpdate from "./Admin/OrderUpdate";
import UpdateUser from "./Admin/UpdateUser";
import Createproduct from "./Admin/Createproducts";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeKey();
  }, []);

  const getStripeKey = async () => {
    try {
      let response = await fetch(
        "https://ecommerce2-0.onrender.com/api/getStripe",
        {
          credentials: "include",
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      let data = await response.json();
      setStripeApiKey(data.stripeKey);
    } catch (error) {
      console.error("Error fetching Stripe key:", error.message);
    }
  };

  addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <BrowserRouter>
          <Header />
          {isAuthenticated && <UserOptions user={user} />}

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/update/password" element={<UpdatePassword />}></Route>
            <Route path="/forgot/password" element={<ForgotPassword />}></Route>

            <Route element={<AdminProtected />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              ></Route>
              <Route path="/admin/users" element={<Users />}></Route>
              <Route path="/admin/reviews" element={<Reviews />}></Route>
              <Route path="/admin/products" element={<ProductsAdmin />}></Route>
              <Route path="/admin/create" element={<Createproduct />}></Route>
              <Route
                path="/admin/update/order/:id"
                element={<OrderUpdate />}
              ></Route>
              <Route
                path="/admin/update/product/:id"
                element={<ProductUpdate />}
              ></Route>
              <Route path="/admin/orders" element={<AdminOrders />}></Route>
              <Route
                path="/admin/update/user/:id"
                element={<UpdateUser />}
              ></Route>
            </Route>

            <Route
              path="/reset/password/:token"
              element={<ResetPassword />}
            ></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/update/profile" element={<UpdateProfile />}></Route>
              <Route path="/shipping" element={<ShippingInfo />}></Route>
              <Route path="/order/confirm" element={<OrderConfirm />}></Route>
              <Route path="/myorders" element={<MyOrders />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/order/payment" element={<Payment />}></Route>
              <Route
                path="/order/details/:id"
                element={<SIngleOrderDetails />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Elements>
    </>
  );
};

export default App;
