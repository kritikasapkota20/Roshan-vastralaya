import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/deleteConfirmation";

const GetCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [categoryTitle, setCategoryTitle] = useState();

  const [delCon, setDelCon] = useState(false);

  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/category`
        );
        if (response.data.success) {
          setCategory(response.data.categories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Something went wrong getting categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setDelCon(false);
        // Update the category list after deletion
        setCategory((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );
      } else {
        toast.error("Failed to delete the category");
      }
      setDeleting(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting the category");
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  
                  
                </h2>
                <p className="text-gray-500 mt-1">Manage your product categories</p>
              </div>
            </div>
            <Link
              to="/addcategory"
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primaryHover transition duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Category</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : category.length < 1 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Found</h3>
              <p className="text-gray-500">Start by adding some categories to organize your products</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.map((cat) => (
                <div key={cat._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="py-4 px-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{cat.title}</h3>
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/getcategory/${cat._id}`}
                        className="inline-flex items-center px-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Products
                      </Link>
                      <button
                        onClick={() => {
                          setDelCon(true);
                          setCategoryTitle(cat.title);
                          setCategoryId(cat._id);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                        disabled={deleting}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {delCon && (
        <DeleteConfirmation
          type={"category"}
          name={categoryTitle}
          delFunc={() => {
            handleDelete(categoryId);
          }}
          setDelCon={setDelCon}
        />
      )}
    </div>
  );
};

export default GetCategory;
