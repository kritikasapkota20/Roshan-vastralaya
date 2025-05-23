// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import productdata from "../assets/ProductData";
// import Modal from "../components/Modal";
// import ReactPaginate from "react-paginate";

// const Product = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
//   const productsPerPage = 6;
//   const sidebarRef = useRef(null);

//   // Extract unique categories
//   const categories = [
//     "All",
//     ...new Set(productdata.map((product) => product.category)),
//   ];

//   // Filter products based on selected category and search term
//   const filteredProducts = productdata
//     .filter(
//       (product) =>
//         selectedCategory === "All" || product.category === selectedCategory
//     )
//     .filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   // Calculate the index of the first and last product for the current page
//   const indexOfLastProduct = (currentPage + 1) * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Calculate total pages
//   const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

//   const openModal = (productTitle) => {
//     setTitle(productTitle);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//     // Scroll to top of products
//     document
//       .getElementById("products-section")
//       .scrollIntoView({ behavior: "smooth" });
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(0); // Reset to first page when category changes

//     // On mobile, close the filters panel after selecting
//     if (window.innerWidth < 1024) {
//       setIsFiltersOpen(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(0); // Reset to first page when search changes
//   };

//   const toggleFilters = () => {
//     setIsFiltersOpen(!isFiltersOpen);
//   };

//   // Close filters when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         window.innerWidth < 1024
//       ) {
//         setIsFiltersOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarRef]);

//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   return (
//     <>
//       {/* Hero Banner - Updated to match About Zenith style */}
//       <section className="bg-gray-100 py-24">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="max-w-3xl mx-auto text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.h1
//               className="text-5xl md:text-6xl font-bold text-primary mb-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//             >
//               Our Products
//             </motion.h1>
//             <motion.div
//               className="w-24 h-1 bg-primary mx-auto mb-10"
//               initial={{ width: 0 }}
//               animate={{ width: 96 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//             ></motion.div>
//             <motion.p
//               className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.6 }}
//             >
//               Excellence in medical equipment, dedicated to empowering
//               healthcare professionals with advanced technology and superior
//               quality.
//             </motion.p>
//             <motion.div
//               className="relative max-w-xl mx-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//             >
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full px-6 py-4 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary p-2 hover:text-primary/80 transition-colors duration-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       <section id="products-section" className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           {/* Mobile Filters Toggle */}
//           <div className="lg:hidden mb-6">
//             <motion.button
//               onClick={toggleFilters}
//               className="w-full bg-white rounded-lg shadow-sm py-3 px-4 flex items-center justify-between border border-gray-200"
//               whileTap={{ scale: 0.98 }}
//             >
//               <span className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-2 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//                   />
//                 </svg>
//                 Filter Products
//               </span>
//               <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
//                 {selectedCategory}
//               </span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
//                   isFiltersOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </motion.button>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar - mobile version with overlay */}
//             <AnimatePresence>
//               {(isFiltersOpen || window.innerWidth >= 1024) && (
//                 <motion.div
//                   className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={() => setIsFiltersOpen(false)}
//                 >
//                   <motion.aside
//                     ref={sidebarRef}
//                     className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white p-6 overflow-y-auto"
//                     initial={{ x: "100%" }}
//                     animate={{ x: 0 }}
//                     exit={{ x: "100%" }}
//                     transition={{ type: "tween" }}
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <div className="flex justify-between items-center mb-6">
//                       <h3 className="text-xl font-semibold">Categories</h3>
//                       <button
//                         onClick={() => setIsFiltersOpen(false)}
//                         className="p-2 rounded-full hover:bg-gray-100"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-6 w-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       {categories.map((category, index) => (
//                         <motion.button
//                           key={index}
//                           onClick={() => handleCategoryClick(category)}
//                           className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
//                             selectedCategory === category
//                               ? "bg-primary text-white shadow-sm"
//                               : "bg-gray-50 text-gray-700 hover:bg-gray-100"
//                           }`}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           {category}
//                         </motion.button>
//                       ))}
//                     </div>

//                     <div className="mt-8 p-4 bg-primary/5 rounded-lg">
//                       <h3 className="text-lg font-semibold mb-2">
//                         Need Assistance?
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-4">
//                         Our team is here to help you find the perfect equipment
//                         for your needs.
//                       </p>
//                       <Link to="/contact">
//                         <motion.button
//                           className="w-full bg-primary text-white px-4 py-2 rounded-lg transition-all duration-200"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           Contact Us
//                         </motion.button>
//                       </Link>
//                     </div>
//                   </motion.aside>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Sidebar - desktop version */}
//             <motion.aside
//               className="lg:w-1/4 order-2 lg:order-1 hidden lg:block"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100">
//                 <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-200">
//                   Categories
//                 </h3>
//                 <div className="space-y-2">
//                   {categories.map((category, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => handleCategoryClick(category)}
//                       className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
//                         selectedCategory === category
//                           ? "bg-primary text-white shadow-sm"
//                           : "bg-gray-50 text-gray-700 hover:bg-gray-100"
//                       }`}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       {category}
//                     </motion.button>
//                   ))}
//                 </div>

//                 <div className="mt-8 p-4 bg-primary/5 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-2">
//                     Need Assistance?
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Our team is here to help you find the perfect equipment for
//                     your needs.
//                   </p>
//                   <Link to="/contact">
//                     <motion.button
//                       className="w-full bg-primary text-white px-4 py-2 rounded-lg transition-all duration-200"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Contact Us
//                     </motion.button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.aside>

//             {/* Products Grid */}
//             <motion.div
//               className="lg:w-3/4 order-1 lg:order-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               {currentProducts.length === 0 ? (
//                 <motion.div
//                   className="flex flex-col items-center justify-center bg-white rounded-xl p-12 shadow-sm border border-gray-100"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-16 w-16 text-gray-300 mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     No Products Found
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     We couldn't find any products matching your criteria. Please
//                     try a different search or category.
//                   </p>
//                   <motion.button
//                     onClick={() => {
//                       setSelectedCategory("All");
//                       setSearchTerm("");
//                     }}
//                     className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Reset Filters
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   variants={staggerContainer}
//                   initial="hidden"
//                   animate="visible"
//                   className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 gap-4"
//                 >
//                   {currentProducts.map((product, index) => (
//                     <motion.div
//                       key={index}
//                       variants={fadeInUp}
//                       whileHover={{ y: -10, transition: { duration: 0.3 } }}
//                       className="bg-white shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-100"
//                     >
//                       <div className="relative overflow-hidden h-72">
//                         <img
//                           src={product.image1}
//                           alt={product.title}
//                           className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
//                           <span className="text-white font-medium px-3 py-1 bg-primary/80 text-xs tracking-wider">
//                             {product.category}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-lg font-medium mb-2 text-gray-800 group-hover:text-primary transition-colors duration-200 tracking-wide">
//                           {product.title}
//                         </h3>
//                         <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-light">
//                           {product.description ||
//                             "High-quality medical equipment for professional healthcare settings."}
//                         </p>
//                         <div className="flex space-x-2">
//                           <Link
//                             to={`/product/${product.id}`}
//                             className="flex-1"
//                           >
//                             <motion.button
//                               className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium text-sm transition-colors duration-200"
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4 mr-1"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                 />
//                               </svg>
//                               Details
//                             </motion.button>
//                           </Link>
//                           <motion.button
//                             onClick={() => openModal(product.title)}
//                             className="flex-1 flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium text-sm transition-colors duration-200"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-4 w-4 mr-1"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                               />
//                             </svg>
//                             Get Quote
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}

//               {/* Results Summary */}
//               {filteredProducts.length > 0 && (
//                 <div className="mt-6 text-sm text-gray-500 text-center">
//                   Showing {indexOfFirstProduct + 1}-
//                   {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
//                   {filteredProducts.length} products
//                 </div>
//               )}

//               {/* Pagination Controls */}
//               {filteredProducts.length > productsPerPage && (
//                 <motion.div
//                   className="mt-12"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5, duration: 0.5 }}
//                 >
//                   <ReactPaginate
//                     previousLabel={
//                       <span className="flex items-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 19l-7-7 7-7"
//                           />
//                         </svg>
//                         Previous
//                       </span>
//                     }
//                     nextLabel={
//                       <span className="flex items-center">
//                         Next
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 ml-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </span>
//                     }
//                     breakLabel={"..."}
//                     pageCount={pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={3}
//                     onPageChange={handlePageClick}
//                     containerClassName={
//                       "flex flex-wrap items-center justify-center gap-2"
//                     }
//                     pageClassName={"inline-flex"}
//                     pageLinkClassName={
//                       "px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                     }
//                     previousClassName={"inline-flex"}
//                     previousLinkClassName={
//                       "px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
//                     }
//                     nextClassName={"inline-flex"}
//                     nextLinkClassName={
//                       "px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
//                     }
//                     breakClassName={"inline-flex"}
//                     breakLinkClassName={
//                       "px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700"
//                     }
//                     activeClassName={"inline-flex"}
//                     activeLinkClassName={
//                       "px-4 py-2 rounded-md bg-primary/10 border border-primary text-primary font-medium"
//                     }
//                     disabledClassName={"opacity-50 cursor-not-allowed"}
//                   />
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Call to action section */}
//       <section className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="max-w-3xl mx-auto text-center"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
//               Can't Find What You're Looking For?
//             </h2>
//             <p className="text-lg text-gray-600 mb-8">
//               Our extensive catalog includes many more products. Contact our
//               team for specialized equipment requirements.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/contact">
//                 <motion.button
//                   className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Contact Us
//                 </motion.button>
//               </Link>
//               <motion.button
//                 onClick={() => openModal("Custom Equipment Request")}
//                 className="bg-white border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Request a Quote
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Modal */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} title={title} />
//     </>
//   );
// };

// export default Product;
