import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function getSelectedProduct() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
        );
        if (response.data.success) {
          const product = response.data.product;
          setFormData({
            image: null,
            name: product.name,
            description: product.desc,
            price: product.price,
            category: product.category?._id || product.category,
            brand: product.brand,
          });
          setImagePreview(`${import.meta.env.VITE_SERVERAPI}/${product.image.replace(/\\/g, "/")}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading product data");
      } finally {
        setLoading(false);
      }
    }
    getSelectedProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
    if (name === "image" && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate price
      const priceNum = Number(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        toast.error("Price must be a valid positive number");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("price", priceNum);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("brand", formData.brand.trim());
      
      // Add image if it exists
      if (formData.image) {
        formDataToSend.append("productImage", formData.image);
      }

      // Log the data being sent
      console.log("Form Data being sent:", {
        name: formData.name.trim(),
        price: priceNum,
        category: formData.category,
        description: formData.description.trim(),
        brand: formData.brand.trim(),
        hasImage: !!formData.image
      });

      // Log the actual FormData contents
      console.log("FormData contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axiosInstance.put(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      console.log("Server Response:", response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        // Instead of navigating, let's refresh the current page
        window.location.reload();
      } else {
        toast.error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      console.error("Error response:", error.response?.data);
      if (error.response?.status === 403) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const errorMessage = error.response?.data?.message || "Error updating product";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleEdit}>
          <div className="mb-1 text-center relative">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full mx-auto flex items-center justify-center relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaPlus className="text-gray-500 text-3xl" />
              )}
            </div>
            <label
              htmlFor="image"
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            ></label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between mb-2">
            <div className="w-full pr-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full pl-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-1"
                htmlFor="brand"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-primary text-white py-2 px-4 rounded-lg transition duration-300 ${
              submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-dark-orange"
            }`}
          >
            {submitting ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
