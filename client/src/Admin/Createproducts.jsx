import { Button, MenuItem, TextField } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  CreateProducts,
  clearError,
  clearSuccess,
} from "../Redux/AdminProductsSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });
  const alert = useAlert();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();
  const {
    error: createError,
    loading,
    success,
  } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (e.target.name === "avatar" && files.length > 0) {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const finalData = {
    name: formData.name,
    stock: formData.stock,
    price: formData.price,
    description: formData.description,
    category: formData.category,
    images: images,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if every input is filled
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.category ||
      !formData.stock ||
      images.length === 0
    ) {
      alert.error(
        "Please fill in all the fields and select at least one image."
      );
      return;
    }

    dispatch(CreateProducts(finalData));
  };

  useEffect(() => {
    if (createError) {
      alert.error(createError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product created successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
      });
      setImages([]);
      setImagesPreview([]);
      navigate("/admin/products");
      dispatch(clearSuccess());
    }
  }, [createError, success, alert, dispatch, navigate]);

  return (
    <div className="w-[100vw] h-screen sm:grid grid-cols-5 pt-[7rem]">
      <div className="col-span-1 flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4 flex items-center justify-center flex-col gap-6 ">
        <h2 className="text-2xl font-semibold mb-4 text-center mt-10">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2 w-[80%] pb-10">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Laptops">Laptops</MenuItem>
            <MenuItem value="Games">Games</MenuItem>
            <MenuItem value="Shoes">Shoes</MenuItem>
            <MenuItem value="Outfit">Outfit</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Files
            </label>
            <div className="flex items-center space-x-2">
              <label
                style={{ backgroundColor: "tomato" }}
                htmlFor="files"
                className="font-semibold cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Browse
              </label>
              <span className="text-gray-500">
                {images.length > 0
                  ? `${images.length} ${
                      images.length === 1 ? "file" : "files"
                    } selected`
                  : "No files selected"}
              </span>
            </div>
            <input
              type="file"
              id="files"
              name="avatar"
              onChange={handleFileChange}
              className="hidden"
              multiple // Allow multiple file selection
            />
          </div>

          {/* Image Previews */}
          {imagesPreview.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image Previews
              </label>
              <div className="flex space-x-4">
                {imagesPreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover border rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<CloudUploadIcon />}
            className="w-full"
            disabled={loading}
          >
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
