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
import { useEffect } from "react";
import { store } from "./Redux/store";
import { useSelector } from "react-redux";
import UserOptions from "./layouts/UserOptions";
import { loadUser } from "./Redux/userSlice";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
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
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/update/profile" element={<UpdateProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
