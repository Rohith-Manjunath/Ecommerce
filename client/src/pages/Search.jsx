import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetProductDetails } from "../Redux/ProductDetailSlice";
import { fetchProducts } from "../Redux/ProductSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    dispatch(fetchProducts(trimmedKeyword));
    navigate(`/products/${trimmedKeyword}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
        <div className="flex items-center w-full mb-4">
          <input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border p-2 rounded-l-md"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
