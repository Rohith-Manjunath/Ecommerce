import { CiDesktopMouse1 } from "react-icons/ci";
import Product from "../components/Product";

const products = {
  name: "Blue t-shirt",
  price: "12000",
  _id: 1,
  images: [
    {
      url: "https://thehouseofrare.com/cdn/shop/products/BLUERABBIT.jpg?v=1645448597",
    },
  ],
};

const Home = () => {
  return (
    <div className="w-full h-auto overflow-scroll flex items-center justify-center flex-col gap-10 banner relative">
      <div className="w-full flex items-center justify-center flex-col  gap-10 h-[100vh]">
        <h2 className="text-xl font-semibold">Welcome To Ecommerce</h2>
        <h3 className="text-4xl font-extrabold">Find Amazing Products</h3>
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
        className="w-[80%] flex items-center justify-between flex-wrap gap-5 mx-auto"
        id="container"
      >
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
        <Product product={products} />
      </div>
    </div>
  );
};

export default Home;
