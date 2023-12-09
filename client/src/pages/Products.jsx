import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice";
import Loader from "../components/Loader";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const Products = () => {
  const { productsPerPage, productsCount } = useSelector(
    (state) => state.products
  );

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert(); // Initialize the hook
  const [priceRange, setPriceRange] = useState([10000, 40000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    dispatch(fetchProducts({ keyword: "", currentPage, priceRange })).catch(
      (err) => {
        // Show an alert if an error occurs
        alert.error(`Error: ${err.message}`);
      }
    );
  }, [dispatch, currentPage, alert, priceRange]);
  return (
    <div className="container mx-auto my-16">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-end gap-5 flex-wrap w-[80%]">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white p-4 rounded-md shadow-md w-1/4 flex flex-col items-start justify-center"
            >
              <img
                src={product.imageURLs[0].url}
                alt=""
                className="max-w-[50%] h-[50%]"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-600 font-semibold">
                Price: &#x20B9;{product.price}
              </p>
              <div className="flex gap-2 items-center justify-center">
                <ReactStars {...options} value={product.ratings} />
                <span>{product.reviews.length} Reviews</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="paginationBox flex items-center justify-center">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={productsPerPage}
          onChange={setCurrentPageNo}
          totalItemsCount={5}
          nextPageText={"next"}
          prevPageText={"prev"}
          firstPageText={"first"}
          lastPageText={"last"}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
      <div className="flex items-center justify-start gap-5 flex-wrap w-[10rem] absolute top-[8rem] left-10 bg-white p-4 rounded-md shadow-md">
        <div className="w-full">
          <Typography variant="h6" className="mb-2 text-gray-700">
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `₹${value}`}
            min={10000}
            max={50000}
            step={1000}
            sx={{
              color: "tomato", // Customize the color
            }}
          />
          <div className="flex justify-between mt-2">
            <Typography variant="body2" className="text-gray-600">
              Min: ₹{priceRange[0]}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Max: ₹{priceRange[1]}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
