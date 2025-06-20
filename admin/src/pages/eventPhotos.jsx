import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  Download,
  Thumbnails,
  Zoom,
  Captions,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css"; // Import Lightbox styles
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa";

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
          `${import.meta.env.VITE_SERVERAPI}/api/v1/event/${eventId}`
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

  async function deleteHandler(src) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            src,
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
    }
  }

  console.log(imgPhoto, "image photo");
  const imgData = imgPhoto?.images?.map((item, index) => ({
    id: index,
    src: `${import.meta.env.VITE_SERVERAPI}/${item}`,
    title: imgPhoto.title,
  }));
  console.log(imgData);
  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center  space-x-3 pb-8">
      
              <FaCalendarAlt className="text-primary text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">Events</h1> 
        </div>
        {imgData && imgData.length ? (
          <>
           <div className="max-w-4xl mx-3 mb-12">
              <h6 className="text-2xl font-bold text-dark-orange border-b-2 border-dark-orange pb-2">
                {imgPhoto.title}
              </h6>
            </div>
            <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-8 px-4">
              {imgData.map((photo, index) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-auto object-cover rounded-lg"
                    onClick={() => {
                      setOpen(true);
                      setCurrentIndex(index);
                      console.log("clicked");
                    }}
                  />
                  <button
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this photo?')) {
                        deleteHandler(photo.src);
                      }
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                    {/* <span className="text-white text-lg font-semibold">{photo.title}</span> */}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>No images found</div>
        )}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={imgData}
          plugins={[Thumbnails, Download, Zoom, Captions]}
          index={currentIndex} // Pass the current index to Lightbox
        />
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="./add"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 my-12"
        >
          Add Photos
        </Link>
      </div>
    </>
  );
};

export default EventDetails;
