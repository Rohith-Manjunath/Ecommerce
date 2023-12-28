import { useDispatch, useSelector } from "react-redux";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  removeFromCart,
} from "../Redux/CartSlice";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Cart = () => {
  const items = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const alert = useAlert();

  const increaseQuantity = (item) => {
    if (item.stock <= item.quantity) {
      alert.error("Out of stock");
    } else {
      dispatch(IncreaseQuantity(item));
    }
  };
  const decreaseQuantity = (item) => {
    dispatch(DecreaseQuantity(item));
  };

  const RemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    alert.success("Item removed successfully");
  };

  const TotalPrice = items.reduce(
    (a, item) => a + item.price * item.quantity,
    0
  );

  return (
    <>
      {items.length > 0 ? (
        <div className="mt-[6rem] w-[90vw] h-[90vh] mx-auto">
          {items.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start gap-1 justify-between px-5 border border-slate-400 mb-4 rounded-md p-3"
              >
                <div className="flex items-start justify-center flex-col gap-2">
                  <img
                    src={item.imageURLs[0].url}
                    alt=""
                    className="w-[8rem] h-[8rem] rounded-md"
                  />
                  <span className="text-[12px] font-bold text-gray-500">
                    product id : {item._id}
                  </span>
                </div>

                <div className="flex items-start justify-center flex-col gap-5">
                  <div className="flex items-start justify-center flex-col gap-1">
                    <p className="text-green-600 font-bold">{item.name}</p>
                    <span className="text-red-600 font-bold">
                      Price : ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="bg-gray-700 text-white px-2 font-bold rounded-sm hover:bg-blue-500 transition-all duration-200 active:scale-95"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-700 text-white px-2 font-bold rounded-sm hover:bg-blue-500 transition-all duration-200 active:scale-95"
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </button>
                    <button
                      style={{ backgroundColor: "tomato" }}
                      className="font-bold px-2 py-1 rounded-sm text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={() => RemoveFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex items-end justify-end flex-col gap-4 pb-5">
            <h2 className="text-end border-t-2 border-t-slate-300 mt-3 pt-2 pr-2 font-bold">
              Total : ₹{TotalPrice.toLocaleString("en-IN")}
            </h2>
            <Link
              to={"/shipping"}
              style={{ backgroundColor: "tomato" }}
              className="text-white p-2 rounded-sm font-bold tracking-wider transition-all duration-300 hover:bg-blue-500 hover:scale-105"
            >
              Proceed to pay
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <h2 className="text-4xl text-slate-400">
            No Products Yet &#58;&#40;
          </h2>
        </div>
      )}
    </>
  );
};

export default Cart;
