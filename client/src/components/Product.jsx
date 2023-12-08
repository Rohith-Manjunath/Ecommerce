import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  size: window.innerWidth < 600 ? 20 : 25,
  isHalf: true,
};

const Product = ({ product }) => {
  return (
    <Link
      to={product._id}
      className="w-[10rem] bg-white border p-3  rounded-lg flex items-start justify-center flex-col gap-2 hover:scale-110 transition-all duration-200"
    >
      <img src={product.images[0].url} alt="" className="w-full rounded-sm" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="font-semibold">{product.price}&#x20B9;</p>
      <ReactStars {...options} />
    </Link>
  );
};

export default Product;
