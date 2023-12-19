import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IncreaseQuantity,
  addToCart,
  DecreaseQuantity,
  removeFromCart,
} from "../Redux/CartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const increaseQuantity = (item) => {
    dispatch(IncreaseQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(DecreaseQuantity(item));
  };

  const RemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const TotalPrice = items.reduce(
    (a, item) => a + item.price * item.quantity,
    0
  );

  return (
    <>
      {items.length > 0 ? (
        <div className="mt-[6rem] w-[90vw] h-[90vh] mx-auto">
          <div className="flex items-center justify-around">
            <h3 className="text-center font-semibold text-xl  text-green-600 border">
              Total Price : &#8377;{TotalPrice}
            </h3>
            <Link
              to={"/shipping"}
              className="text-bold bg-orange-500 p-2 rounded-sm text-white hover:bg-blue-500 hover:scale-105 transition-all duration-300"
            >
              Proceed to pay
            </Link>
          </div>
          <div className="mx-auto sm:flex sm:flex-row sm:items-start sm:justify-evenly sm:flex-wrap sm:h-auto">
            {items.map((item) => {
              return (
                <div
                  key={item._id}
                  className="m-5 flex flex-col items-center justify-center p-4 h-auto gap-4 border border-slate-400 rounded-md mx-4 sm:w-1/2 md:w-1/3 lg:w-1/4 hover:mx-10 hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                >
                  <img
                    src={item.imageURLs[0].url}
                    alt=""
                    className="max-sm:w-[50%] max-md:w-[70%] rounded-md md:w-[70%]"
                  />
                  <p className="text-[11px] xl:text-[14px]">
                    ProductId :{" "}
                    <span className="text-slate-500">{item._id}</span>{" "}
                  </p>
                  <h2 className="font-bold text-green-500">{item.name}</h2>
                  <span className="font-semibold text-red-400">
                    Price :&#8377;{item.price}
                  </span>
                  <span>{item.quantity}</span>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="bg-slate-600 px-2 text-white p-1"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      className="bg-slate-600 px-2 text-white p-1"
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => RemoveFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
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
