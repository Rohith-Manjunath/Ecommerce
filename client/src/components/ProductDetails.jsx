import ReactStars from "react-rating-stars-component";
import { LuUserSquare } from "react-icons/lu";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../Redux/CartSlice";
import { useAlert } from "react-alert";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { PostReview, updateSuccess } from "../Redux/ReviewSlice";

const ProductDetails = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  const options1 = {
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    isHalf: true,
  };

  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const alert = useAlert();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const {
    error: reviewError,
    success,
    loading,
  } = useSelector((state) => state.review);
  const { products } = useSelector((state) => state.products.products);
  const item = products.find((item) => item._id === id);
  const AddtoCart = (product) => {
    dispatch(addToCart(product));
    alert.success("Product added to cart successfully");
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitReview = () => {
    dispatch(PostReview({ comment: review, rating, productId: id }));
    setOpen(false);
  };

  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
    }
    if (success) {
      alert.success("Review updated successfully");
      navigate("/");
      dispatch(updateSuccess());
    }
  }, [dispatch, reviewError, success, alert, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {item ? (
            <>
              <>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                  fullWidth="lg"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Add Review"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <textarea
                        className="p-2 w-full resize-none outline-none border border-gray-500 rounded-md text-gray-800"
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Type your review here..."
                        rows="5" // Set the number of visible rows
                        style={{ minHeight: "80px" }} // Set the minimum height
                      />
                    </DialogContentText>
                  </DialogContent>

                  <DialogContent>
                    <DialogContentText
                      style={{ backgroundColor: "#F0F0F0", padding: "10px" }}
                    >
                      <ReactStars
                        {...options1}
                        size={40}
                        onChange={(newRating) => {
                          setRating(newRating);
                        }}
                      />
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      autoFocus
                      onClick={handleClose}
                      style={{ color: "gray" }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={submitReview} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </>

              <div className="product-details sm:w-screen sm:h-screen flex items-center justify-center mt-[10rem] sm:mt-0">
                <div className="border border-slate-300 rounded-lg sm:w-screen sm:h-screen flex flex-col items-center justify-center p-5 sm:flex-row ">
                  <div className="w-full sm:w-1/2  h-1/2 sm:h-full flex items-center justify-center">
                    {item && item.imageURLs[0] && (
                      <img
                        src={item.imageURLs[0].url}
                        alt=""
                        className="w-[50%] sm:w-[60%] rounded-lg md:w-[50%] lg:w-[50%] xl:w-[40%]"
                      />
                    )}
                  </div>
                  <div className="w-full h-1/2 sm:w-1/2 sm:h-full flex flex-col gap-4 items-center justify-center mt-5">
                    {item && (
                      <span className="text-[12px] text-slate-500">
                        product id: {item._id}
                      </span>
                    )}

                    <div className="flex gap-2 flex-col items-center justify-center">
                      {item && <ReactStars {...options} value={item.ratings} />}
                      {item && (
                        <span>
                          {item.numOfReviews}{" "}
                          {item.numOfReviews > 0 ? "Review" : "Reviews"}
                        </span>
                      )}
                    </div>
                    {item && (
                      <h3 className="text-xl font-bold">
                        &#x20B9;{item.price}
                      </h3>
                    )}
                    <div className="flex items-center justify-center gap-3">
                      <button
                        disabled={item && item.stock <= 0}
                        className={`p-2 rounded font-bold shadow-sm ${
                          item && item.stock <= 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed border"
                            : "bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                        }`}
                        onClick={() => AddtoCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {item && item.stock <= 0 ? (
                      <span className="text-red-600 font-semibold">
                        status: Out of stock
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold">
                        status: In stock
                      </span>
                    )}
                    {item && (
                      <p className="text-slate-600">{item.description}</p>
                    )}
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href={"#reviews"}
                        className="bg-orange-500 text-white py-2 px-2 rounded-md font-semibold tracking-widest shadow-xl active:scale-90 transition-all duration-300"
                      >
                        Reviews
                      </a>
                      <button
                        className="bg-orange-500 text-white py-2 px-4 rounded-md font-semibold tracking-widest shadow-xl active:scale-90 transition-all duration-300"
                        onClick={handleClickOpen}
                      >
                        Sumbit Review
                      </button>
                    </div>
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
                {item && item.reviews.length > 0 ? (
                  <div className="w-full flex flex-col sm:flex-row overflow-x-scroll gap-5">
                    {item.reviews.map((rev) => {
                      return (
                        <div
                          className="flex flex-col items-center justify-center gap-2 border p-7 rounded-lg w-full md:w-1/3"
                          key={rev._id}
                        >
                          <h2 className="font-bold tracking-wider flex items-center justify-center ">
                            <LuUserSquare className=" text-slate-500 text-5xl rounded-lg" />{" "}
                          </h2>
                          <h3 className="font-bold">{rev.name}</h3>
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
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
