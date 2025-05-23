import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
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
                  <a href="https://www.facebook.com/profile.php?id=61575754582731" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-primary hover:bg-blue-200 transition text-xl shadow">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-primary hover:bg-blue-200 transition text-xl shadow">
                    <FaTwitter />
                  </a>
                  <a href="https://www.instagram.com/electron_house77/" target="_blank" rel="noopener noreferrer"
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

            {/* Map Placeholder */}
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
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Message subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primaryHover text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Based in Nepal &bull; Available Worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
