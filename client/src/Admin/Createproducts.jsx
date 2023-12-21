import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CreateProducts } from "../Redux/AdminProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";

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
  const { error, message, loading } = useSelector(
    (state) => state.adminProducts
  );

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
    dispatch(CreateProducts(finalData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    } else if (message) {
      alert.success(message);
    }
  }, [alert, error, message]);

  return (
    <div className=" flex items-center justify-center">
      <div className="w-[15%] h-full">
        <Sidebar />
      </div>
      <div className="w-[50%] mx-auto mt-8 p-20 border rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
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
            disabled={loading}
            className="w-full"
          >
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
