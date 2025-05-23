import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
 
// import logoImg from "/logo2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const topBarHeight = document.querySelector(".topbar")?.offsetHeight || 0;

      if (window.scrollY > topBarHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`sticky top-0 w-full z-40 px-4 md:px-8 transition-all duration-300 ease-in-out ${scrolled
        ? "bg-white shadow-md py-2"
        : "bg-white/90 backdrop-blur-sm py-4" 
        }`}
    >
      <div className="container mx-auto   flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 group"
        >
          {/* <img
            src={logoImg}
            className={`transition-all duration-300 ${scrolled ? "h-20" : "h-20"} w-20`}
            alt=" Logo"
          /> */}
            <span className="text-2xl font-bold text-primary block mb-2">Roshan Vastralaya</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-primary/10 focus:outline-none md:hidden transition-all duration-200"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {/* Icon when menu is closed */}
          <svg
            className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {/* Icon when menu is open */}
          <svg
            className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center md:space-x-2 lg:space-x-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          <NavItem to="/product" label="Collections" />
          <NavItem to="/gallery" label="Gallery" />
          <NavItem to="/blog" label="Blog" />
          <NavItem to="/contact" label="Contact" />
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"} 
        md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out shadow-lg`}
        id="mobile-menu"
      >
        <div className="px-4 pt-4 pb-6 space-y-2 border-t">
          <MobileNavItem to="/" label="Home" />
          <MobileNavItem to="/about" label="About" />
          <MobileNavItem to="/product" label="Collections" />
          <MobileNavItem to="/gallery" label="Gallery" />
          {/* <MobileNavItem to="/events" label="Events" /> */}
          <MobileNavItem to="/contact" label="Contact" />
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Item Component
const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-base font-medium transition-all duration-200 hover:scale-105 ${isActive
        ? "text-primary bg-sec-gray rounded-lg shadow-sm"
        : "text-sec-dark-gray hover:text-primary hover:bg-sec-gray rounded-lg"
        }`}
    >
      {label}
    </Link>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

// Mobile Navigation Item Component
const MobileNavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:translate-x-1 ${isActive
        ? "bg-sec-gray text-primary"
        : "text-sec-dark-gray hover:bg-sec-gray hover:text-primary"
        }`}
    >
      {label}
    </Link>
  );
};

MobileNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Header;
