// home page wala

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import ReactPaginate from "react-paginate";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productLoading, setProductLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsPerPage = 16;

  useEffect(() => {
    // Fetch categories and products
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/category`
        );
        const categoryData = categoryResponse.data.categories || [];
        console.log("categoryData", categoryData);

        // Fetch products
        const productResponse = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products`
        );
        const productData = productResponse.data.products || [];

        console.log("productData", productData);

        // Set state with fetched data
        setCategories(categoryData);
        setProducts(productData);
        setLoading(false);
      } catch (e) {
        setError("Failed to fetch Product. Server Error");
        setLoading(false);
        setCategories([]);
        setProducts([]);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products || [];

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const openModal = (productTitle) => {
    setTitle(productTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleCategoryClick = (category) => {
    console.log("Handling category click", category); // Add this log to check the selected category
    setSelectedCategory(category ? category.title : "All");
    setProductLoading(true);

    async function fetchFromCategory() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products`,
          {
            params: {
              categoryId: category ? category._id : "",
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setProductLoading(false);
      }
    }

    fetchFromCategory();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-3xl font-semibold">
        Please Wait...
      </div>
    );
  if (error)
    return (
      <div className="min-h-96 w-full bg-slate-300 flex justify-center items-center font-semibold text-xl">
        {error}
      </div>
    );

  return (
    <>
      <div className="bg-slate-100 py-10 px-4 md:px-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Featured Products</h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6"></div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`px-6 py-2 text-sm font-medium rounded-3xl transition-all duration-300 ${selectedCategory === "All"
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-6 py-2 text-sm font-medium transition-all rounded-3xl duration-300 ${selectedCategory === category.title
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {productLoading ? (
            <div className="flex justify-center items-center min-h-[300px] ">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {!currentProducts.length ? (
                <div className="w-full bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                  <p className="text-gray-600">We couldn't find any products in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                 {currentProducts.map((product) => (
  <div
    key={product._id}
    className="bg-white rounded-xl w-[260px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
  >
    {/* <Link to={`/product/${product._id}`} className="block group relative flex-1 flex flex-col"> */}
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-[#EBECEF] flex-shrink-0 h-[200px] ">
        <img
          src={`${import.meta.env.VITE_SERVER}/${product.image.replace(/\\/g, "/")}`}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    {/* </Link> */}

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Text Content with Fixed Height */}
        <div className="mb- h-20"> {/* Adjust height as needed */}
    <Link to={`/product/${product._id}`} className="block group relative flex-1 flex flex-col">
          
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1 hover:text-primary">
            {product.name}
           
          </h3>
           </Link>
          <p className="text-sm text-gray-500 line-clamp-1">
            {product.category?.title || 'Traditional Wear'}
          </p>
        </div>

        {/* Button Container */}
        <div className="mt-auto">
          <button
            className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/product/${product._id}`;
            }}
          >
            View Details
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
  </div>
))}
                </div>
              )}
            </div>
          )}


          {/* Pagination Controls */}
          <div className="flex justify-center mt-12">
            <ReactPaginate
              previousLabel={
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </span>
              }
              nextLabel={
                <span className="flex items-center gap-1">
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              }
              breakLabel={<span className="px-2">...</span>}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="flex items-center gap-2 bg-white/80 rounded-xl px-4 py-2 shadow-lg"
              pageClassName="rounded-full"
              pageLinkClassName="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              previousClassName="rounded-full"
              previousLinkClassName="flex items-center justify-center w-24 h-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200"
              nextClassName="rounded-full"
              nextLinkClassName="flex items-center justify-center w-24 h-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200"
              breakClassName="rounded-full"
              breakLinkClassName="flex items-center justify-center w-10 h-10 text-gray-400"
              activeClassName="bg-primary text-white"
              activeLinkClassName="!bg-primary !text-white !shadow-md"
              disabledClassName="opacity-50 pointer-events-none"
              renderOnZeroPageCount={null}
            />
          </div>

        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={title} />
    </>
  );
};

export default Product;