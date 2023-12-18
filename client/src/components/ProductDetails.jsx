import ReactStars from "react-rating-stars-component";
import { LuUserSquare } from "react-icons/lu";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice";
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const { products } = useSelector((state) => state.products.products);
  const params = useParams();
  const { id } = params;
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const alert = useAlert();

  const product = products.find((product) => {
    return product._id === id;
  });

  const AddtoCart = (product) => {
    dispatch(addToCart(product));
    alert.success("Product added to cart successfully");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-details w-[100vw] h-[100vh] flex items-center justify-center mt-[10rem] sm:mt-0">
            <div className="border border-slate-300 rounded-lg w-[full] h-[full] flex flex-col items-center justify-center p-5 sm:flex-row ">
              <div className="w-full sm:w-1/2  h-1/2 sm:h-full flex items-center justify-center">
                {product && product.imageURLs[0] && (
                  <img
                    src={product.imageURLs[0].url}
                    alt=""
                    className="w-[50%] sm:w-[60%] rounded-lg md:w-[50%] lg:w-[50%] xl:w-[40%]"
                  />
                )}
              </div>
              <div className="w-full h-1/2 sm:w-1/2 sm:h-full flex flex-col gap-4 items-center justify-center mt-5">
                {product && (
                  <span className="text-[12px] text-slate-500">
                    product id: {product._id}
                  </span>
                )}

                <div className="flex gap-2 flex-col items-center justify-center">
                  {product && (
                    <ReactStars {...options} value={product.ratings} />
                  )}
                  {product && (
                    <span>
                      {product.reviews.length}{" "}
                      {product.reviews.length > 0 ? "Reviews" : "Review"}
                    </span>
                  )}
                </div>
                {product && (
                  <h3 className="text-xl font-bold">&#x20B9;{product.price}</h3>
                )}
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={() => AddtoCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>

                {product && product.stock <= 0 ? (
                  <span className="text-red-600 font-semibold">
                    status: Out of stock
                  </span>
                ) : (
                  <span className="text-green-500 font-semibold">
                    status: In stock
                  </span>
                )}
                {product && (
                  <p className="text-slate-600">{product.description}</p>
                )}
                <a
                  href={"#reviews"}
                  className="bg-orange-500 text-white py-2 px-4 rounded-md font-semibold tracking-widest shadow-xl active:scale-90 transition-all duration-300"
                >
                  Reviews
                </a>
              </div>
            </div>
          </div>
          <div
            id="reviews"
            className=" flex items-center justify-center flex-col gap-5 border shadow-lg mt-[10rem] sm:mt-0"
          >
            <h2 className="text-center font-bold underline underline-offset-4 text-slate-500 text-xl">
              Reviews
            </h2>
            {product && product.reviews.length > 0 ? (
              <div className="w-full flex flex-col sm:flex-row overflow-x-scroll gap-5">
                {product.reviews.map((rev) => {
                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-2 border p-7 rounded-lg w-full md:w-1/3"
                      key={rev._id}
                    >
                      <h2 className="font-bold tracking-wider flex items-center justify-center ">
                        <LuUserSquare className=" text-slate-500 text-5xl rounded-lg" />{" "}
                      </h2>
                      <h3>{rev.name}</h3>
                      <ReactStars {...options} value={rev.rating} />
                      <p>{rev.comment}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h2 className="text-xl text-slate-400">No Reviews yet</h2>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
