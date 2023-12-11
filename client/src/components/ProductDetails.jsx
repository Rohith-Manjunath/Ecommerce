import ReactStars from "react-rating-stars-component";
import { LuUserSquare } from "react-icons/lu";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  const product = products.find((product) => {
    return product._id === id;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-details w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="border rounded-lg w-[70%] h-[70%] flex items-center justify-center">
              <div className="w-1/2 h-full flex items-center justify-center">
                {product && product.imageURLs[0] && (
                  <img
                    src={product.imageURLs[0].url}
                    alt=""
                    className="w-[20rem] h-[25rem]"
                  />
                )}
              </div>
              <div className="w-1/2 h-full flex flex-col gap-4 items-center justify-center">
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
                  <button className="bg-slate-600 px-2 text-white p-1">
                    +
                  </button>
                  <button className="bg-slate-600 px-2 text-white p-1">
                    -
                  </button>
                  <button className="bg-red-500 text-white p-1 rounded">
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
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-5 border shadow-lg">
            <h2 className="text-center font-bold underline underline-offset-4 text-slate-500 text-xl">
              Reviews
            </h2>
            {product && product.reviews.length > 0 ? (
              <div className="flex gap-4 items-center justify-center max-w-lg overflow-x-scroll p-4 ">
                {product.reviews.map((rev) => {
                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-2 border p-7 rounded-lg"
                      key={rev._id}
                    >
                      <h2 className="font-bold tracking-wider flex items-center justify-center ">
                        <LuUserSquare className="text-xl text-slate-500 rounded-full" />{" "}
                        : {rev.name}
                      </h2>
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
