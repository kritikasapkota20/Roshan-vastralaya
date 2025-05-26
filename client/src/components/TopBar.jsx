import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="text-white px-4 md:px-8 py-2 bg-primary">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-1">
        {/* Left side - Email and Phone */}
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-neutral" />
            <a
              href="mailto:your-email@example.com"
              className="hover:text-neutral text-sm text-white"
            >
              info@roshanvastaralaya.com
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-neutral scale-x-[-1]" />
            <a
              href="tel:+1234567890"
              className="hover:text-neutral text-sm text-white"
            >
              +977 985-1188872
            </a>
          </div>
        </div>

        {/* Right side - Social Media Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-4 mt-2 md:mt-0">
          <p className="text-sm ">24/7 Customer Service</p>
          {/* <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral hover:text-white"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral hover:text-white"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral hover:text-white"
          >
            <FaWhatsapp size={20} />
          </a> */}
          {/* <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-gray-300"
          >
            <FaYoutube size={20} />
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
