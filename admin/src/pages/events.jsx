import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPlus, FaTrashAlt, FaEye, FaRegCalendarAlt } from "react-icons/fa";
import { DeleteConfirmation } from "../components/deleteConfirmation";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [delCon, setDelCon] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({ id: "", title: "" });

  useEffect(() => {
    async function getEvents() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/event`
        );
        if (response.data.success) {
          setEvents(response.data.events);
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
    getEvents();
  }, [reRender]);

  async function deleteHandler(id) {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/event/${id}`,
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-primary text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">Events</h1>
            </div>
            
            <Link
              to="./add"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark-orange transition duration-200 shadow-md"
            >
              <FaPlus />
              <span>Add Event</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <FaRegCalendarAlt className="text-5xl mb-4 text-gray-400" />
              <p className="text-xl mb-4">No events found</p>
              <Link
                to="./add"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark-orange transition duration-200"
              >
                Create Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={`${import.meta.env.VITE_SERVERAPI}/${event.images[0]}`}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Event date badge */}
                    {event.date && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md z-10">
                        <div className="text-primary text-sm font-bold">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    )}

                    {/* Overlay with effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
                      <div className="self-end">
                        <button
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                          onClick={() => {
                            setEventToDelete({ id: event._id, title: event.title });
                            setDelCon(true);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <h3 className="text-white text-lg font-semibold text-center">
                          {event.title}
                        </h3>
                        <Link
                          to={`./${event._id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-200 shadow-md"
                        >
                          <FaEye />
                          <span>Browse Event</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {delCon && (
        <DeleteConfirmation
          type="event"
          name={eventToDelete.title || "this event"}
          delFunc={() => deleteHandler(eventToDelete.id)}
          setDelCon={setDelCon}
          deleting={deleting}
        />
      )}
    </div>
  );
}
