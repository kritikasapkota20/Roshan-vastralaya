import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import logoImg from "/logo.jpg";

const socialIconMotion =
  "transition-transform duration-300 hover:-translate-y-1 hover:scale-125 focus:-translate-y-1 focus:scale-125";

const linkMotion =
  "text-white/80 hover:text-white inline-block transition-all duration-300 hover:-translate-y-1 focus:-translate-y-1 hover:scale-105 focus:scale-105";

const Footer = () => {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Subtle animated gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="w-[120%] h-[120%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-10 bg-gradient-to-tr from-white via-primary to-white animate-footer-gradient absolute" />
      </div>
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <img src={logoImg} alt="Annapurna Logo" className="h-12 w-auto" /> */}
              <h1 className="text-2xl font-bold tracking-tight animate-fade-in">Roshan Vastralaya</h1>
            </div>
            <p className="text-white/80 leading-relaxed animate-fade-in-slow">
              Your destination for functional, elegant, and traditional clothing for every occasion.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className={socialIconMotion}
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className={socialIconMotion}
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className={socialIconMotion}
                aria-label="Whatsapp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block animate-fade-in">
              Contact Us
            </h3>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="mt-1 text-neutral animate-bounce-slow" />
                <span>Janakpur, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-neutral animate-pulse-slow" />
                <a
                  href="tel:+9771234567890"
                  className="hover:text-white transition-colors"
                >
                  +977 1234567890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-neutral animate-pulse-slow" />
                <a
                  href="mailto:info@zenithmediequip.com"
                  className="hover:text-white transition-colors"
                >
                  info@roshanvastaralaya.com
                </a>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block animate-fade-in">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className={linkMotion}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className={linkMotion}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={linkMotion}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative inline-block animate-fade-in">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/#"
                  className={linkMotion}
                >
                  Help Center
                </a>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className={linkMotion}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className={linkMotion}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-white/60 text-sm animate-fade-in-slow">
              © {new Date().getFullYear()} Roshan Vastralaya. All rights reserved.
            </p>
             <div className="text-white/60 text-sm mt-4 sm:mt-0 flex items-center">
            Designed by 
            <a href="https://technavata.com/" target="_blank" rel="noopener noreferrer" className="text-white ml-1 hover:text-gray-200">
              Navata Tech
            </a>
          </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes footer-gradient {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg);}
            50% { transform: translate(-50%, -50%) rotate(8deg);}
          }
          .animate-footer-gradient {
            animation: footer-gradient 10s ease-in-out infinite alternate;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-fade-in-slow {
            animation: fade-in 2s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-6px);}
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1;}
            50% { opacity: 0.7;}
          }
          .animate-pulse-slow {
            animation: pulse-slow 2.5s infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;