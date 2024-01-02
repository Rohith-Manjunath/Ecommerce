import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import { style } from "@mui/system";
import MetaData from "../layouts/MetaData";

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
    <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
      <MetaData title="Search" />

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-2 rounded shadow-md w-full md:w-1/2 flex flex-col items-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
        <div className="flex items-center w-full mb-4">
          <input
            required
            type="text"
            placeholder="Search by name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border p-2 rounded-l-md outline-gray-300"
          />
          <button
            style={{ backgroundColor: "tomato" }}
            type="submit"
            className="font-bold text-white px-4 py-2 rounded-r-md active:scale-95 transition-all duration-200 tracking-widest"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
