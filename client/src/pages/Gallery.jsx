import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import {
  Download,
  Thumbnails,
  Zoom,
  Captions,
  Fullscreen,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css"; // Import Lightbox styles
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import axios from "axios";
import { toast } from "react-toastify";

const Gallery = () => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [imgPhoto, setImgPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    async function getGallery() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/gallery`
        );
        if (response.data.success) {
          console.log(response.data);
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

  const imgData = imgPhoto.map((item) => ({
    id: item._id,
    src: `${import.meta.env.VITE_SERVER}/${item.url}`,
    title: item.title,
    description: item.description || '',
    tags: item.tags ,
  }));

  // Get unique categories from tags
  const categories = [
    "all",
    ...new Set(imgData.flatMap(item => item.tags || [])),
  ];

  // Filter images based on selected category
  const filteredImages = filter === "all" 
    ? imgData 
    : imgData.filter(item => item.tags && item.tags.includes(filter));

  return (
    <>
      {/* Hero Section - Updated to match About Zenith style */}
      <section className="bg-gray-100 py-24">
        {/* <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our Gallery
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-primary mx-auto mb-10"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            ></motion.div>
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Excellence in fashion, showcasing our curated collections, premium fabrics, and timeless styles for every occasion.
            </motion.p>
          </motion.div>
        </div> */}
       <div className="text-center mb-6">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
    Our Gallery
    <span className="block w-16 h-1 bg-primary rounded-full mt-2 mx-auto"></span>
  </h2>
</div>

      </section>

      {/* Filter Buttons */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery Grid */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-lg shadow-sm max-w-md mx-auto border border-gray-100"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-300 mx-auto mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Images Found</h3>
                <p className="text-gray-500">No gallery items match your selected filter. Please try another category.</p>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((photo, index) => (
                <motion.div 
                  key={photo.id} 
                  className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 6), duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(index);
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {photo.title && (
                      <p className="text-white font-medium text-lg mb-2">{photo.title}</p>
                    )}
                    {photo.description && (
                      <p className="text-white/80 text-sm line-clamp-2">{photo.description}</p>
                    )}
                    <button 
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(index);
                      }}
                      className="mt-4 self-start px-4 py-2 rounded-full bg-primary/80 text-white text-sm font-medium hover:bg-primary transition-colors duration-200"
                    >
                      View Larger
                    </button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <motion.button
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(index);
                      }}
                      className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-primary hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({
          src: img.src,
          alt: img.title,
          title: img.title,
          description: img.description,
        }))}
        plugins={[Thumbnails, Zoom, Download, Captions, Fullscreen]}
        captions={{ descriptionTextAlign: "center" }}
        thumbnails={{ width: 100, height: 80, gap: 16, border: 0 }}
      />
    </>
  );
};

export default Gallery;
