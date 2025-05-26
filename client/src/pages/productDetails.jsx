import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SafeHtml from "../components/safeHtml";
import { toast } from "react-toastify";
import { FaTag, FaRupeeSign, FaFileDownload, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [deleting, setDeleting] = useState(false);
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

    window.scrollTo({ top: 0, behavior: "smooth" });
    getSelectedProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg px-6 pb-6 md:px-8 md:pb-8">
                {/* Image Section */}
                <div className="lg:sticky lg:top-12 h-fit">
                  <div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl bg-gray-50/50 group cursor-zoom-in"
                    onMouseEnter={() => setZoom(true)}
                    onMouseLeave={() => setZoom(false)}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => setZoom(true)}
                    onTouchEnd={() => setZoom(false)}
                    onTouchMove={handleTouchMove}
                  >
                    <img
                      alt={selectedProduct.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        zoom ? "scale-150" : "scale-100"
                      }`}
                      src={`${import.meta.env.VITE_SERVER}/${selectedProduct.image.replace(/\\/g, "/")}`}
                      style={zoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {zoom && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded z-20 pointer-events-none select-none">
                        Zoom
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col gap-8 md:pt-10">
                  {/* Product Header */}
                  <div className="space-y-4 border-b border-gray-200 pb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FaTag className="text-primary w-6 h-6" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 font-playfai">
                        {selectedProduct.name}
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-medium">Category:</span>
                      <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {selectedProduct.category?.title || "Uncategorized"}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-purple-100/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        Product Description
                      </h3>
                      <div className="prose prose-lg max-w-none text-gray-700 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                        <SafeHtml htmlString={selectedProduct.desc} />
                      </div>
                    </div>
                  </div>

{/* --- Contact to Buy Section --- */}
<div className="mt-2">
  <div className="bg-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-md border border-primary/10">
    <div className="flex-1 text-center md:text-left">
      <h4 className="text-xl font-bold text-primary mb-2 flex items-center justify-center md:justify-start gap-2">
        <FaWhatsapp className="inline-block text-green-500" /> Interested in this product?
      </h4>
      <p className="text-gray-700 mb-4">
        To buy or inquire, contact us:
      </p>
      <div className="flex flex-col items-center md:items-start gap-2 mb-3">
        <a
          href="tel:+9771234567890"
          className="flex items-center gap-2 text-gray-800 text-base font-medium cursor-pointer hover:text-primary transition"
        >
          <FaPhoneAlt className="text-primary" />
          <span>+977 1234567890</span>
        </a>
        <a
          href="mailto:info@roshanvastaralaya.com"
          className="flex items-center gap-2 text-gray-800 text-base font-medium cursor-pointer hover:text-primary transition"
        >
          <FaEnvelope className="text-primary" />
          <span>info@roshanvastaralaya.com</span>
        </a>
      </div>
    </div>
    <div>
      <Link
        to="/contact"
        className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primaryHover text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        Contact Us
      </Link>
    </div>
  </div>
</div>
{/* --- End Contact to Buy Section --- */}

                  {/* Catalog Download */}
                  {selectedProduct.catalog && (
                    <div className="mt-4 animate-bounce-horizontal">
                      <a
                        href={`${import.meta.env.VITE_SERVER}/api/v1/products/${id}/catalog`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                      >
                        <FaFileDownload className="w-5 h-5 mr-2 transition-transform" />
                        Download Full Specification
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary" />
        </div>
      )}
    </div>
  );
}