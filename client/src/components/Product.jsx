import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  isHalf: true,
};

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 bg-white border p-3  rounded-lg flex items-center justify-center flex-col gap-4 hover:scale-110 transition-all duration-300"
    >
      <img
        src={product.imageURLs[0].url}
        alt=""
        className="rounded-sm w-[70%] sm:w-[90%] "
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="font-semibold">&#x20B9;{product.price}</p>
      <p className="font-semibold">Ratings : {product.ratings}</p>

      <div className="flex gap-2 items-center justify-center">
        <ReactStars {...options} value={product.ratings} />
        <span>{product.reviews.length} Reviews</span>
      </div>
    </Link>
  );
};

export default Product;
