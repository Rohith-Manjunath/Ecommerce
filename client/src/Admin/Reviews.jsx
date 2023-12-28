import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  clearError,
  deleteReview,
  fetchProductsAdmin,
  fetchReviews,
  updateReview,
} from "../Redux/AdminProductsSlice";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Reviews = () => {
  const [productId, setProductId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const dispatch = useDispatch();
  const {
    reviews,
    loading,
    error,
    error: reviewError,
  } = useSelector((state) => state.admin);
  const { error: deleteError, loading: deleteLoading } = useSelector(
    (state) => state.admin
  );
  const { error: updateError } = useSelector((state) => state.admin);
  const alert = useAlert();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const options1 = {
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    isHalf: true,
  };

  const GetProductReviews = (e) => {
    e.preventDefault();
    dispatch(fetchReviews(productId));
  };

  const DeleteReview = (id) => {
    alert.success("Review deleted successfully");
    dispatch(deleteReview({ productId, reviewId: id }));
    dispatch(fetchProductsAdmin());
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setReviewId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitReview = () => {
    setOpen(false);
    alert.success("Review updated successfully");
    dispatch(updateReview({ comment: review, rating, productId, reviewId }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
  }, [
    alert,
    error,
    deleteError,
    deleteLoading,
    dispatch,
    reviewError,
    updateError,
  ]);

  return (
    <div className="md:grid grid-cols-10 h-screen w-screen">
      <div className="col-span-2 flex items-center justify-center h-full border border-r-gray-300 pt-[7rem]">
        <Sidebar />
      </div>
      <div className="col-span-8 flex flex-col items-center justify-start md:justify-center h-full pt-[5rem] md:pt-[10rem] gap-10">
        <form
          onSubmit={GetProductReviews}
          className="flex flex-col items-center justify-center gap-4 shadow-xl border md:w-[50%] lg:w-1/3 p-5 bg-white rounded-md"
        >
          <h2 className="font-semibold text-[20px] md:text-2xl">
            Get product reviews
          </h2>
          <input
            required
            onChange={(e) => setProductId(e.target.value)}
            type="text"
            placeholder="Enter product id"
            className="border p-2 rounded-md outline-none text-[14px] w-full"
          />
          <button
            disabled={loading}
            type="submit"
            style={{ backgroundColor: "tomato" }}
            className="p-2 text-white font-bold tracking-widest rounded-md outline-none active:scale-90 shadow-md active:shadow-none transition-all duration-200 "
          >
            {loading ? "Please wait..." : "Get Reviews"}
          </button>
        </form>

        <div className="font-bold mx-auto overflow-x-auto w-screen md:w-[70%]">
          {reviews && reviews.length > 0 ? (
            loading ? (
              <Loader />
            ) : (
              <table className="w-full overflow-x-auto">
                <thead
                  style={{ backgroundColor: "tomato" }}
                  className="text-white"
                >
                  <tr>
                    <th className="px-6 py-3 border-b-2">Review Id</th>
                    <th className="px-6 py-3 border-b-2">Name</th>
                    <th className="px-6 py-3 border-b-2">Comment</th>
                    <th className="px-6 py-3 border-b-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td className="px-6 py-3 text-sm border-b-2">
                        {review._id}
                      </td>
                      <td className="px-6 py-3 text-sm border-b-2">
                        {review.name}
                      </td>
                      <td className="px-6 py-3 text-sm border-b-2 max-h-[10px] overflow-auto">
                        {review.comment}
                      </td>
                      <td className="border px-4 py-2 flex items-center justify-center gap-3 text-[20px]">
                        <MdEdit
                          className="text-blue-700 z-[200] hover:cursor-pointer"
                          onClick={() => handleClickOpen(review._id)}
                        />
                        <MdDelete
                          className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                          onClick={() => DeleteReview(review._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : // Display the "No reviews found" message only when there are no reviews
          loading ? (
            <Loader />
          ) : (
            <h2 className="text-[15px] sm:text-xl md:text-2xl mt-4 text-gray-500 text-center overflow-hidden">
              No reviews found for this product &#58; &#41;
            </h2>
          )}
        </div>
      </div>
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          fullWidth="lg"
        >
          <DialogTitle id="responsive-dialog-title">{"Add Review"}</DialogTitle>
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
            <Button autoFocus onClick={handleClose} style={{ color: "gray" }}>
              Cancel
            </Button>
            <Button onClick={() => submitReview()} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default Reviews;
