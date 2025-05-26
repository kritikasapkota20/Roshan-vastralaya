import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import SafeHtml from "../components/safeHtml";
import { DeleteConfirmation } from "../components/deleteConfirmation";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [delCon, setDelCon] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
      );
      if (response.data.success) {
        setSelectedProduct(response.data.product);
      } else {
        setSelectedProduct("not found");
      }
    } catch (err) {
      console.error(err);
      setSelectedProduct("error");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, location.state?.refresh]);

  // Clear the refresh state after using it
  useEffect(() => {
    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.refresh, navigate, location.pathname]);

  async function handleDelete() {
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
        navigate("/");
      } else {
        toast.error(response.data.message);
        setDeleting(false);
      }
    } catch (err) {
      setError(err);
      console.error(err);
      setDeleting(false);
    }
  }

  // async function catalogDownloadHandler() {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}/catalog`
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     setError(error);
  //     console.error(error);
  //   }
  // }
  async function catalogDeleteHandler() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}/catalog`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast(response.data.message);
        setSelectedProduct(response.data.product);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen w-full text-rose-600 flex justify-center items-center text-3xl font-semibold bg-gray-50">
        Error Getting Product
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedProduct && !loading ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {selectedProduct === "not found" ? (
              <div className="flex justify-center items-center min-h-[60vh] text-2xl text-gray-600">
                Product not found
              </div>
            ) : selectedProduct === "error" ? (
              <div className="flex justify-center items-center min-h-[60vh] text-2xl text-gray-600">
                Error finding product
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-end space-x-4">
                    <Link
                      to={`/product/${id}/edit`}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit Product
                    </Link>
                    <button
                      className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                      onClick={() => setDelCon(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete Product
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Product Information</h2>
                      <h1 className="mt-2 text-2xl font-bold text-gray-900">{selectedProduct.name}</h1>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                      <div className="prose max-w-none">
                        <SafeHtml htmlString={selectedProduct.desc} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Brand</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">{selectedProduct.brand}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {selectedProduct.category ? selectedProduct.category.title : "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Listed On</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          {new Date(selectedProduct.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">Rs. {selectedProduct.price}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedProduct.catalog ? (
                        <>
                          <Link
                            to="./catalogUpload"
                            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Reupload Catalogue
                          </Link>
                          <a
                            href={`${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}/catalog`}
                            target="_blank"
                            className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Catalogue
                          </a>
                          <button
                            onClick={() => catalogDeleteHandler()}
                            className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete Catalogue
                          </button>
                        </>
                      ) : (
                        <Link
                          to="./catalogUpload"
                          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Upload Catalog
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="sticky top-8">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img
                          alt={selectedProduct.title}
                          className="w-full h-[600px] object-contain p-4"
                          src={`${import.meta.env.VITE_SERVERAPI}/${selectedProduct.image.replace(/\\/g, "/")}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {delCon && (
        <DeleteConfirmation
          type={"product"}
          name={selectedProduct.name}
          delFunc={() => {
            handleDelete();
          }}
          setDelCon={setDelCon}
          deleting={deleting}
        />
      )}
    </div>
  );
}
