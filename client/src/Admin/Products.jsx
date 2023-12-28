import Sidebar from "./Sidebar";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  clearDeleteStatus,
  clearError,
  deleteProduct,
  fetchProductsAdmin,
} from "../Redux/AdminProductsSlice";
import Loader from "../layouts/Loader";

const Products = () => {
  const { error, loading, products } = useSelector((state) => state.admin);
  const { error: deleteError, isDeleted } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const DeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
  }, [deleteError, alert, dispatch]);

  useEffect(() => {
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch(clearDeleteStatus());
    }
  }, [isDeleted, alert, navigate, dispatch]);

  return (
    <div className="w-[100vw] h-screen md:grid md:grid-cols-5 pt-[7rem]">
      <div className="col-span-1 flex items-center justify-center mb-20">
        <Sidebar />
      </div>
      <div className="col-span-4 flex items-center justify-start flex-col gap-6">
        <div className="col-span-4 flex items-center justify-start flex-col gap-6 mx-auto ">
          <h2 className="font-bold text-2xl">All Products</h2>
          {loading ? (
            <Loader />
          ) : products && products.length > 0 ? (
            <div className="w-screen md:w-full overflow-x-auto">
              <table className="w-full font-bold text-[12px] md:text-[15px]">
                <thead>
                  <tr
                    className=" text-white"
                    style={{ backgroundColor: "tomato" }}
                  >
                    <th className="border px-4 py-2 ">Product ID</th>
                    <th className="border px-4 py-2 ">Stock</th>
                    <th className="border px-4 py-2 ">Name</th>
                    <th className="border px-4 py-2 ">Price (INR)</th>
                    <th className="border px-4 py-2 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border px-4 py-2 ">{product._id}</td>
                      <td className="border px-4 py-2 ">{product.stock}</td>
                      <td className="border px-4 py-2 ">{product.name}</td>
                      <td className="border px-4 py-2 ">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                      {/* Add action buttons or links as needed */}
                      <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                        <Link to={`/admin/update/product/${product._id}`}>
                          <MdEdit className="text-blue-700 z-[200]" />
                        </Link>

                        <MdDelete
                          onClick={() => DeleteProduct(product._id)}
                          className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-2xl text-gray-500 font-bold">
              No Products Found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
