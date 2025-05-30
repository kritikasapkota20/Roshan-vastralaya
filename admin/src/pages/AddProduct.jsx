import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const AddProduct = ({ edit, upload }) => {
  const navigate = useNavigate();
  let id;
  if (edit || upload) {
    id = useParams().id;
  }

  const editorRef = useRef();

  useEffect(() => {
    async function getSelectedProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
        );
        console.log(response.data);
        if (response.data.success) {
          setFormData({
            brand: response.data.product.brand,
            category:
              response.data.product.category && response.data.product.category
                ? response.data.product.category._id
                : null,
            description: response.data.product.desc,
            name: response.data.product.name,
            // price: response.data.product.price,
          });
        }
      } catch (err) {
        console.error(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    }
    if (edit) {
      getSelectedProduct();
    }
  }, [id]);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    // price: "",
    category: "",
    brand: "",
  });

  const [categories, setCategories] = useState([]);

  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState();

  const [loading, setLoading] = useState("false");

  const [submitting, setSubmitting] = useState(false);

  const [catalog, setCatalog] = useState();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/category`
        );
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong with the contact form");
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert("Description is required!");
      return;
    }
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("productImage", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    // formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("catalogFile", catalog);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          image: null,
          name: "",
          description: "",
          // price: "",
          category: "",
          brand: "",
        });
        setImagePreview(null);
        navigate("/");
      } else {
        toast.error("smthng went wrong");
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error(error.response?.data?.message || "Error adding product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name?.trim() || !formData.description?.trim() || !formData.category || !formData.brand?.trim()) {
        toast.error("All fields are required");
        return;
      }

      // Validate price
      // const priceNum = Number(formData.price);
      // if (isNaN(priceNum) || priceNum <= 0) {
      //   toast.error("Price must be a valid positive number");
      //   return;
      // }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim());
      // formDataToSend.append("price", priceNum);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("brand", formData.brand.trim());

      // Add image if it exists
      if (formData.image) {
        formDataToSend.append("productImage", formData.image);
      }

      // Log the data being sent
      console.log("Sending edit request with data:", {
        name: formData.name.trim(),
        // price: priceNum,
        category: formData.category,
        description: formData.description.trim(),
        brand: formData.brand.trim(),
        hasImage: !!formData.image
      });

      const response = await axiosInstance.put(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/product/${id}`);
      } else {
        toast.error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
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

  const addCategoryHandler = async (e) => {
    setLoading(true);
    console.log(newCategory);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/category`,
        { title: newCategory }
      );
      if (response.data.success) {
        setCategories(response.data.categories);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setAddCategory(false);
    }
  };

  const handleCatelogUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("catalogFile", catalog);

      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}/catalog`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/product/${id}`);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error uploading catalog");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 ${submitting && "opacity-60 cursor-not-allowed"}`}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-primary ">
            <h2 className="text-2xl font-bold text-white text-center">
              {edit ? "Edit" : upload ? "Catalog" : "Add"} Product {upload && "Upload"}
            </h2>
          </div>

          <form
            onSubmit={edit ? handleEdit : upload ? handleCatelogUpload : handleSubmit}
            className={`p-6 space-y-6 ${submitting && "pointer-events-none"}`}
          >
            {!edit && !upload && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <FaPlus className="text-gray-400 text-3xl mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload image</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!upload && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                    required
                  />
                </div>
{/* 
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                    Price*
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                </div> */}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="category">
                    Category*
                  </label>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <BeatLoader color="#6366f1" size={8} />
                      <span className="text-sm text-gray-500">Loading categories...</span>
                    </div>
                  ) : addCategory ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter category name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={newCategory}
                        required
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark-orange transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          onClick={addCategoryHandler}
                          disabled={loading}
                        >
                          {loading ? "Adding..." : "Add Category"}
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                          onClick={() => setAddCategory(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <select
                      name="category"
                      id="category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                      value={formData.category}
                      onChange={(e) => {
                        if (e.target.value === "add-new") {
                          setAddCategory(true);
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                        }
                      }}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                      <option value="add-new">+ Add New Category</option>
                    </select>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="brand">
                    Brand*
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            )}

          
            {/* Catalog Upload Section */}
            {/* 
            {!edit && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="catalogFile">
                  Catalog {!upload && "(Optional)"}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition duration-200">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="catalogFile"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-dark-orange focus-within:outline-none"
                      >
                        <span>Upload a PDF file</span>
                        <input
                          id="catalogFile"
                          name="catalogFile"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setCatalog(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
                {catalog && (
                  <p className="mt-2 text-sm text-gray-600 flex items-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {catalog.name}
                  </p>
                )}
              </div>
            )}
            */}


            {!upload && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description*
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200">
                  <CKEditor
                    editor={ClassicEditor}
                    required
                    id="description"
                    config={{
                      toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "|",
                        "link",
                        "insertTable",
                        "mediaEmbed",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "indent",
                        "outdent",
                      ],
                      plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo,
                      ],
                    }}
                    data={formData.description}
                    onReady={(editor) => {
                      editorRef.current = editor;
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData((prev) => ({
                        ...prev,
                        description: data,
                      }));
                    }}
                  />
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primaryHover transform hover:scale-[1.02]"
                  }`}
                disabled={submitting}
              >
                {submitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <BeatLoader color="#ffffff" size={8} />
                    <span>Processing...</span>
                  </div>
                ) : (
                  edit
                    ? "Update Product"
                    : upload
                      ? "Upload Catalog"
                      : "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
