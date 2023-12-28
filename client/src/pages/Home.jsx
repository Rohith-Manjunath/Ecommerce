import { CiDesktopMouse1 } from "react-icons/ci";
import Product from "../components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProducts } from "../Redux/ProductSlice";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert"; // Import the hook

const Home = () => {
  const { products } = useSelector((state) => state.products.products);
  const { loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const alert = useAlert(); // Initialize the hook

  useEffect(() => {
    // Dispatch the fetchProducts action
    dispatch(fetchProducts({ keyword: "", category: "" })).catch((err) => {
      // Show an alert if an error occurs
      alert.error(`Error: ${err.message}`);
    });

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error]);
  // Check if products is undefined before mapping
  const productsToDisplay = products || [];

  if (loading) {
    <Loader />;
  }

  return (
    <div className="w-full h-auto overflow-scroll flex items-center justify-center flex-col gap-10 banner relative">
      <div className="w-full flex items-center justify-center flex-col gap-10 h-[100vh]">
        <h2 className="text-[1.3rem] text-center md:text-[1.5rem] lg:text-3xl font-semibold">
          Welcome To Ecommerce
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-extrabold">
          Find Amazing Products
        </h3>
        <a
          href="#container"
          className="text-xl font-semibold flex items-center justify-center gap-2 border p-3 hover:bg-slate-500 hover:text-white transition-all duration-300 hover:cursor-pointer shadow-md active:shadow-none active:translate-x-[1px] active:translate-y-[1px] hover:scale-105 rounded-md"
        >
          Scroll <CiDesktopMouse1 />
        </a>
      </div>
      <h2 className="text-center border-b-2 font-bold text-2xl">
        Featured Products
      </h2>
      <div
        className="flex flex-col items-start justify-evenly w-[90%] gap-5 sm:flex-row sm:flex-wrap h-auto p-10"
        id="container"
      >
        {!loading ? (
          productsToDisplay.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
