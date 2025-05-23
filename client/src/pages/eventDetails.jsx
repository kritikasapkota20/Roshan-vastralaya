import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Download,
  Thumbnails,
  Zoom,
  Captions,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css"; // Import Lightbox styles
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { pathname } = useLocation();
  const { eventId } = useParams();

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgPhoto, setImgPhoto] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    async function getGallery() {
      console.log("getting selected event");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/event/${eventId}`
        );
        if (response.data.success) {
          console.log(response.data, "selected event");
          setImgPhoto(response.data.event);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    }
    getGallery();
  }, [reRender]);

  console.log(imgPhoto, "image photo");
  const imgData = imgPhoto?.images?.map((item, index) => ({
    id: index,
    src: `${import.meta.env.VITE_SERVER}/${item}`,
    title: imgPhoto.title,
  }));
  console.log(imgData);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center pb-8">
          <h2 className="text-4xl font-bold text-gray-800 relative">
            Event Gallery
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
          </h2>
        </div>
        
        {imgData && imgData.length ? (
          <>
            <h6 className="text-2xl font-semibold text-gray-700 mb-10 pb-2 border-b-2 border-green-500 inline-block">
              {imgPhoto.title}
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {imgData.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => {
                        setOpen(true);
                        setCurrentIndex(index);
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Image
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-2xl text-gray-500">No images found</div>
            <div className="mt-4 text-gray-400">Please check back later for updates</div>
          </div>
        )}
        
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={imgData}
          plugins={[Thumbnails, Download, Zoom, Captions]}
          index={currentIndex}
        />
      </div>
    </div>
  );
};

export default EventDetails;
