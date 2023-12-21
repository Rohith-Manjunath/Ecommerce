import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loader from "../layouts/Loader";
import { DeleteProductAdmin } from "../Redux/DeleteProductSlice";
import { useAlert } from "react-alert";
import { fetchProductsAdmin } from "../Redux/AdminProductsSlice";
import { useEffect } from "react";

const ProductsAdmin = () => {
  const { products, loading } = useSelector((state) => state.adminProducts);
  const { message, error } = useSelector((state) => state.adminDeleteProduct);
  const dispatch = useDispatch();
  const alert = useAlert();

  const DeleteProduct = (id) => {
    dispatch(DeleteProductAdmin(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    } else if (message) {
      // Display the success message only when products are deleted
      if (message.includes("Product deleted")) {
        alert.success(message);
      }
    }
    dispatch(fetchProductsAdmin());
  }, [error, alert, message, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[100vw] h-screen grid grid-cols-5 pt-[10rem]">
          <div className="col-span-1 flex items-start justify-center">
            <Sidebar />
          </div>
          <div className="w-[100vw] h-auto grid grid-cols-5 ">
            <div className="col-span-4 flex items-center justify-start flex-col gap-6">
              <h2 className="font-bold text-2xl">All Products</h2>

              <table className="table-auto w-full ">
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
                      <td className="border px-4 py-2 ">₹{product.price}</td>
                      {/* Add action buttons or links as needed */}
                      <td className="border px-4 py-2 flex items-center justify-center gap-2 text-[20px]">
                        <MdEdit className="text-blue-700 z-[200]" />

                        <MdDelete
                          className="text-red-500 z-[200] hover:scale-120 transition-all duration-200 hover:cursor-pointer"
                          onClick={() => DeleteProduct(product._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsAdmin;
