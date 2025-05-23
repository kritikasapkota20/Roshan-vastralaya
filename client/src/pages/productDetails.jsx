import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SafeHtml from "../components/safeHtml";
import { toast } from "react-toastify";
import { FaTag, FaRupeeSign, FaFileDownload } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [deleting, setDeleting] = useState(false);

  // Zoom state
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    async function getSelectedProduct() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`
        );
        if (response.data.success) {
          setSelectedProduct(response.data.product);
        } else {
          setSelectedProduct("not found");
        }
      } catch (err) {
        console.error(err);
        setSelectedProduct("error");
      } finally {
        setLoading(false);
      }
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    getSelectedProduct();
    scrollToTop();
  }, [id]);

  // Mouse move for zoom
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Touch move for zoom (mobile)
  const handleTouchMove = (e) => {
    if (!e.touches.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f3e8ff]">
      {selectedProduct && !loading ? (
        <section className="text-gray-700 body-font overflow-hidden">
          <div className="container px-4 md:px-8 py-10 md:py-20 mx-auto">
            {selectedProduct === "not found" ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                  <p className="text-gray-600 text-lg">The product you're looking for doesn't exist.</p>
                </div>
              </div>
            ) : selectedProduct === "error" ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Error</h2>
                  <p className="text-gray-600 text-lg">There was an error finding the product.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row bg-white/80 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-lg">
                {/* Product Image with Zoom */}
                <div className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-white p-6 md:p-12">
                  <div
                    className="relative w-full h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-gray-50/50 group cursor-zoom-in"
                    onMouseEnter={() => setZoom(true)}
                    onMouseLeave={() => setZoom(false)}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => setZoom(true)}
                    onTouchEnd={() => setZoom(false)}
                    onTouchMove={handleTouchMove}
                  >
                    <img
                      alt={selectedProduct.name}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ${zoom ? "scale-150" : "scale-100"}`}
                      src={`${import.meta.env.VITE_SERVER}/${selectedProduct.image.replace(/\\/g, "/")}`}
                      style={
                        zoom
                          ? {
                              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                              transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                            }
                          : {}
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    {zoom && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-20 pointer-events-none select-none">
                        Zoom
                      </div>
                    )}
                  </div>
                </div>
                {/* Product Details */}
                <div className="lg:w-1/2 w-full flex flex-col justify-cente p-6 md:p-12">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-primary tracking-widest uppercase mb-2 flex items-center gap-2">
                      <FaTag className="inline-block" /> Product Details
                    </h2>
                    <h1 className="text-lg font-bold text-gray-900 mb-4 leading-tight font-playfair">
                      {selectedProduct.name}
                    </h1>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-medium text-base">Category:</span>
                      <span className="text-gray-900 font-semibold text-base">
                        {selectedProduct.category
                          ? selectedProduct.category.title
                          : "Category not specified"}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-medium text-base">Price:</span>
                      <span className="flex items-center text-primary font-bold text-2xl">
                        <FaRupeeSign className="mr-1" />
                        {selectedProduct.price}
                      </span>
                    </div> */}
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition duration-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <SafeHtml htmlString={selectedProduct.desc} />
                      </div>
                    </div>
                    {selectedProduct.catalog && (
                      <a
                        href={`${import.meta.env.VITE_SERVER}/api/v1/products/${id}/catalog`}
                        target="_blank"
                        className="inline-flex items-center px-6 py-3 bg-primary/90 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-2"
                      >
                        <FaFileDownload className="w-5 h-5 mr-2" />
                        Download Catalogue
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}
    </div>
  );
}