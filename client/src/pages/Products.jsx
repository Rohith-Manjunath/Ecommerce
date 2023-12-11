import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice";
import Loader from "../components/Loader";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const Products = () => {
  const { productsPerPage, productsCount } = useSelector(
    (state) => state.products.products
  );

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.products);
  const loading = productsData.loading;
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert(); // Initialize the hook
  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const [productName, setProductName] = useState("");
  const categories = ["Laptop", "Shoe", "Outfit", "Mobile"];
  const [activeCategory, setActiveCategory] = useState(null);
  const [ratingsRange, setRatingsRange] = useState([0, 5]); // Default ratings range
  const params = useParams();
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryClick = (category) => {
    setProductName(category);
    setActiveCategory(category);
  };

  const handleRatingsChange = (event, newValue) => {
    setRatingsRange(newValue);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        keyword: keyword || "",
        currentPage,
        priceRange,
        category: productName,
        ratingsRange,
      })
    ).catch((err) => {
      // Show an alert if an error occurs
      alert.error(`Error: ${err.message}`);
    });
  }, [
    dispatch,
    currentPage,
    alert,
    priceRange,
    productName,
    ratingsRange,
    keyword,
  ]);

  return (
    <div className="container mx-auto my-16">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center gap-5 flex-wrap w-[80%] mx-auto">
          {productsData.products.map((product) => (
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
      {productsPerPage < productsCount && (
        <div className="paginationBox flex items-center justify-center">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={productsPerPage}
            onChange={setCurrentPageNo}
            totalItemsCount={productsCount}
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
      )}
      <div className="flex items-center justify-start gap-5 flex-wrap w-[10rem] absolute top-[6rem] left-10 bg-white p-4 rounded-md shadow-md">
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
        <div className="w-full mb-4">
          <Typography variant="h6" className="mb-2 text-gray-700 ">
            Ratings Range
          </Typography>
          <Slider
            value={ratingsRange}
            onChange={handleRatingsChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}+`}
            min={0}
            max={5}
          />
        </div>
        <div>
          <h2 className="font-bold text-blue-500 underline underline-offset-2">
            Products
          </h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`${
                  activeCategory === category ? "text-blue-500 underline" : ""
                } hover:underline-offset-4 transition-all duration-200 hover:underline hover:text-blue-400 hover:cursor-pointer mt-2`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
