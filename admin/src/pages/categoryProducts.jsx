import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/deleteConfirmation";
// Add React icons for a modern look
import { FaEye, FaTrash, FaBoxOpen, FaPlus } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";

const CategoryProducts = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [delCon, setDelCon] = useState(false);
  const { categoryId } = useParams();
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products`,
          {
            params: {
              categoryId,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryId]);

  async function handleDelete(id) {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setDeleting(false);
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MdOutlineCategory className="text-primary text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {products.length && products[0].category
                    ? products[0].category.title
                    : "Category"} Products
                </h1>
                <p className="text-gray-500 mt-1">Manage your category products</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/addproducts"
                className="px-4 py-2.5 bg-primary text-white rounded-xl flex items-center space-x-2 hover:bg-primaryHover transition duration-200 shadow-md hover:shadow-lg"
              >
                <FaPlus />
                {/* <span>Add Product</span> */}
              </Link>
              <Link
                to="/categories"
                className="px-4 py-2.5 bg-blue-500 text-white rounded-xl flex items-center space-x-2 hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg"
              >
                <BsGrid3X3Gap />
                <span>All Categories</span>
              </Link>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length < 1 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <FaBoxOpen className="text-6xl mb-4 text-gray-400" />
              <p className="text-xl font-medium mb-2">No products found in this category</p>
              <p className="text-gray-400 mb-6">Add some products to get started</p>
              <Link
                to="/addproducts"
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primaryHover transition duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Product</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={`${import.meta.env.VITE_SERVERAPI}/${product.image.replace(/\\/g, "/")}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                      <div className="flex space-x-3">
                        <Link
                          to={`/product/${product._id}`}
                          className="p-3 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <FaEye className="text-xl" />
                        </Link>
                        <button
                          className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                          onClick={() => {
                            setDelCon(true);
                            setProductName(product.name);
                            setProductId(product._id);
                          }}
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                        {product.category && product.category.title
                          ? product.category.title
                          : "Uncategorized"}
                      </span>
                      <span className="text-primary font-bold text-lg">Rs {product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {delCon && (
        <DeleteConfirmation
          type={"product"}
          name={productName}
          delFunc={() => {
            handleDelete(productId);
          }}
          setDelCon={setDelCon}
        />
      )}
    </div>
  );
};

export default CategoryProducts;
