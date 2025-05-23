// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import productdata from "../assets/ProductData";

// import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams();
//   console.log(id);

//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState();

//   useEffect(() => {
//     async function getSelectedProduct() {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`
//         );
//         console.log(response.data);
//         if (response.data.success) {
//           setSelectedProduct(response.data.product);
//         }
//       } catch (err) {
//         console.error(err);
//         alert(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getSelectedProduct();
//   }, [id]);

//   console.log(selectedProduct);

//   if (!selectedProduct) {
//     return (
//       <h1 className="text-center text-primary text-3xl">Product not found</h1>
//     );
//   }

//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return (
//     <>
//       <section className="text-gray-600 body-font overflow-hidden">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="lg:w-4/5 mx-auto flex flex-wrap">
//             <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
//               <h2 className="text-sm title-font text-gray-500 tracking-widest text-uppercase">
//                 brand name
//               </h2>
//               <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
//                 {selectedProduct.name.toUpperCase()}
//               </h1>
//               <div className="flex mb-4">
//                 <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
//                   Description
//                 </a>
//               </div>
//               <p className="leading-relaxed mb-4">
//                 {selectedProduct.description}
//               </p>
//               <div className="flex border-t border-gray-200 py-2">
//                 <span className="text-gray-500">Color</span>
//                 <span className="ml-auto text-gray-900">Blue</span>
//               </div>
//               <div className="flex border-t border-gray-200 py-2">
//                 <span className="text-gray-500">Size</span>
//                 <span className="ml-auto text-gray-900">Medium</span>
//               </div>
//               <div className="flex border-t border-b mb-6 border-gray-200 py-2">
//                 <span className="text-gray-500">Quantity</span>
//                 <span className="ml-auto text-gray-900">4</span>
//               </div>
//               <div className="flex">
//                 <span className="title-font font-medium text-2xl text-gray-900">
//                   Rs.{selectedProduct.price}
//                 </span>
//                 <button className="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary rounded">
//                   Download Catalogue
//                 </button>
//                 <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
//                   <svg
//                     fill="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <img
//               alt="ecommerce"
//               className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
//               src={selectedProduct.image1}
//             />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductDetails;
