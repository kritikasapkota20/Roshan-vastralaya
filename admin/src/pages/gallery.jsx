import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Download,
  Thumbnails,
  Zoom,
  Captions,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import toast from "react-hot-toast";
// Add modern UI elements
import { FaCamera, FaTrashAlt, FaPlus, FaImages } from "react-icons/fa";
import { DeleteConfirmation } from "../components/deleteConfirmation";

const Gallery = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgPhoto, setImgPhoto] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [delCon, setDelCon] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState({ id: "", title: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    async function getGallery() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/gallery`
        );
        if (response.data.success) {
          setImgPhoto(response.data.gallery);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [reRender]);

  async function deleteHandler(id) {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setReRender(!reRender);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setDeleting(false);
      setDelCon(false);
    }
  }

  const imgData = imgPhoto.map((item) => ({
    id: item._id,
    src: `${import.meta.env.VITE_SERVERAPI}/${item.url}`,
    title: item.title,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FaImages className="text-primary text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">
                Photo Gallery
              </h1>
            </div>
            
            <Link
              to="./add"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition duration-300 shadow-md"
            >
              <FaPlus />
              <span>Add Photos</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : imgData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <FaCamera className="text-5xl mb-4 text-gray-400" />
              <p className="text-xl mb-4">No images found in the gallery</p>
              <Link
                to="./add"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition duration-200"
              >
                Upload Photos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {imgData.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-100"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(index);
                      }}
                    />
                  </div>
                  
                  {/* Overlay with effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
                    <div className="self-end">
                      <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                        onClick={() => {
                          setPhotoToDelete({ id: photo.id, title: photo.title });
                          setDelCon(true);
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    
                    <h3 className="text-white font-medium truncate px-2 pb-2">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={imgData}
        plugins={[Thumbnails, Download, Zoom, Captions]}
        index={currentIndex}
      />
      
      {delCon && (
        <DeleteConfirmation
          type="photo"
          name={photoToDelete.title || "this photo"}
          delFunc={() => deleteHandler(photoToDelete.id)}
          setDelCon={setDelCon}
          deleting={deleting}
        />
      )}
    </div>
  );
};

export default Gallery;
