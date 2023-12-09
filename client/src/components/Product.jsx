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
      className="w-1/5 bg-white border p-3  rounded-lg flex items-start justify-center flex-col gap-2 hover:scale-110 transition-all duration-300"
    >
      <img
        src={product.imageURLs[0].url}
        alt=""
        className="w-full rounded-sm"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="font-semibold">{product.price}&#x20B9;</p>
      <p className="font-semibold">Ratings:{product.ratings}</p>

      <div className="flex gap-2 items-center justify-center">
        <ReactStars {...options} value={product.ratings} />
        <span>{product.reviews.length} Reviews</span>
      </div>
    </Link>
  );
};

export default Product;