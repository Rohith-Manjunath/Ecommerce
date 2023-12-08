import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const { products } = useSelector((state) => state.products);
  const params = useParams();
  const { id } = params;

  const product = products.find((product) => {
    return product._id === id;
  });

  return (
    <div className="w-[70%] p-5 mx-auto h-[90vh] flex items-center justify-center max-md:w-full">
      <div className="border w-full h-full flex items-center justify-center shadow-md rounded-md bg-white max-md:flex-col">
        <div className="w-1/2 h-full flex items-center justify-center max-md:w-full">
          <img
            src={product.imageURLs[0].url}
            alt=""
            className="max-w-[70%] h-[60%] rounded-md"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col items-start justify-center gap-5 p-5 max-md:w-full max-md:items-center">
          <h2 className="text-3xl font-bold text-indigo-700">{product.name}</h2>
          <h3 className="text-xl text-green-600">&#x20B9; {product.price}</h3>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex gap-2 items-center justify-center">
            <ReactStars {...options} value={product.ratings} />
            <span>{product.reviews.length} Reviews</span>
          </div>
          <div className="mt-4 border p-2">
            <h4 className="text-xl font-bold mb-2 text-center underline underline-offset-4">
              Reviews
            </h4>
            {product.reviews.length > 0 ? (
              <ul className="flex items-center justify-center max-w-[30rem] overflow-x-scroll">
                {product.reviews.map((review, index) => (
                  <li
                    key={index}
                    className="mb-2 flex items-center justify-center flex-col gap-1"
                  >
                    <strong>{review.name}:</strong> {review.comment}
                    <ReactStars
                      {...options}
                      value={review.rating}
                      className="self-center"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
