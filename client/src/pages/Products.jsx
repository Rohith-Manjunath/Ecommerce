import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice";
import Loader from "../layouts/Loader";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { IoOptionsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

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
  const [priceRange, setPriceRange] = useState([1000, 200000]);
  const [productName, setProductName] = useState("");
  const categories = [
    "Laptops",
    "Shoes",
    "Outfits",
    "Mobiles",
    "Music",
    "Games",
  ];
  const [activeCategory, setActiveCategory] = useState("");
  const [ratingsRange, setRatingsRange] = useState([0, 5]); // Default ratings range
  const params = useParams();
  const keyword = params.keyword || "";
  const [show, setShow] = useState(false);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryClick = (category) => {
    setProductName(category);
    setActiveCategory(category);
    setShow(false);
  };

  const handleRatingsChange = (event, newValue) => {
    setRatingsRange(newValue);
  };

  const toggleFilter = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        keyword: keyword,
        currentPage,
        priceRange,
        category: activeCategory,
        ratingsRange,
      })
    );
  }, [
    dispatch,
    currentPage,
    alert,
    priceRange,
    productName,
    ratingsRange,
    keyword,
    activeCategory,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mt-[8rem] w-[100%]">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-around items-start justify-center gap-5 flex-wrap w-[100%] mx-auto">
              {productsData &&
              productsData.products &&
              productsData.products.length > 0 ? (
                productsData.products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-center gap-3 border border-slate-300"
                  >
                    <img
                      src={product.imageURLs[0].url}
                      alt=""
                      className="w-[80%] rounded-md"
                    />
                    <h3 className="text-xl font-semibold mb-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-green-600 font-semibold">
                      Price: &#x20B9;{product.price}
                    </p>
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                      <ReactStars {...options} value={product.ratings} />
                      <span>{product.reviews.length} Reviews</span>
                    </div>
                  </Link>
                ))
              ) : (
                <h2 className="text-3xl text-gray-500">No Products</h2>
              )}
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
          {show ? (
            <IoClose
              className="absolute left-2 top-[5rem] text-4xl text-blue-500 hover:cursor-pointer active:scale-90 transition-all duration-300"
              onClick={toggleFilter}
            />
          ) : (
            <IoOptionsSharp
              className="absolute left-2 top-[5rem] text-4xl text-blue-500 hover:cursor-pointer active:scale-90 transition-all duration-300"
              onClick={toggleFilter}
            />
          )}

          <div
            className={`z-[200] ${
              !show ? "-translate-x-[20rem]" : "translate-x-[-0rem]"
            } items-center justify-start gap-5 flex-wrap w-[15rem] h-screen top-[5rem] left-10 bg-white p-8 rounded-md shadow-md transition-all duration-400 fixed`}
          >
            <div className="w-full">
              <Typography variant="h6" className="mb-2 text-gray-700">
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₹${value}`}
                min={1000}
                max={200000}
                step={1000}
                sx={{
                  color: "tomato", // Customize the color
                  width: "100",
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
            <div className="w-full my-4">
              <Typography variant="h6" className="mb-2 text-gray-700 ">
                Ratings
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
                      activeCategory === category
                        ? "text-blue-500 underline"
                        : ""
                    } hover:underline-offset-4 transition-all duration-200 hover:underline hover:text-blue-400 hover:cursor-pointer mt-2`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
