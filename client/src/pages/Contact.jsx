import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const { pathname } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/contact`,
        { name, email, message }
      );

      if (response.data.success) {
        setName("");
        setEmail("");
        setMessage("");
        toast.success("Message Sent.");
      }
    } catch (error) {
      toast.error("Failed to submit form.");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br  from-[#e3f5fa] to-[#f5fbfd] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block mb-4 relative">
            Contact Us
            <span className="block h-1 w-16 bg-primary mt-2 mx-auto rounded"></span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Our Store</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <span className="font-semibold">Roshan Vastralaya</span><br />
                Janakpur, Nepal<br />
                Open: 10am - 8pm (Mon-Sat)
              </p>

              {/* Social Media */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61576359953885" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-primary hover:bg-blue-200 transition text-xl shadow">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-primary hover:bg-blue-200 transition text-xl shadow">
                    <FaTwitter />
                  </a>
                  <a href="https://www.instagram.com/roshan_vastralaya849/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-100 text-primary hover:bg-pink-200 transition text-xl shadow">
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-primary hover:bg-blue-200 transition text-xl shadow">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Find Us</h3>
              <div className="rounded-lg overflow-hidden shadow-lg h-64">
                <iframe
                  title="Roshan Vastralaya Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.0384679238978!2d85.92258729999999!3d26.7431485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec6aa8d9397625%3A0x9df82189a9fb736a!2sRoshan%20Vastralaya!5e0!3m2!1sen!2snp!4v1747738636366!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primaryHover text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg relative"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Based in Nepal • Available Worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;