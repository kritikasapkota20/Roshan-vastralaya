import Slider from "react-slick";
import { images } from "../assets/heroData";
import herosection from "/banner.jpeg"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import axios from "axios";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    accessibility: false,
    swipe: false,
    arrows: false, // We'll use custom arrows
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  useEffect(() => {
    async function getBannerProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products`,
          {
            params: {
              banner: true,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    }
    // getBannerProducts(); // Uncomment if you want to fetch products for banners
  }, []);

  return (
    <div className="relative">
      {/* Custom Left Arrow */}
      <button
        className=" items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#cfc6c6] transition-all duration-300 shadow-lg group"
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Previous Slide"
        type="button"
      >
        <svg
          className="w-6 h-6 text-primary group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Custom Right Arrow */}
      <button
        className="flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#cfc6c6] transition-all duration-300 shadow-lg group"
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Next Slide"
        type="button"
      >
        <svg
          className="w-6 h-6 text-primary font-bold group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Slider ref={sliderRef} {...settings}>
        {images.map((items, index) => (
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full min-h-[400px] md:min-h-[480px]" key={index}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            {/* Background image */}
            <img
              src={items.image}
              alt={items.title}
              className="w-full h-full object-cover md:object-[center_top] object-center absolute inset-0 brightness-[.75]"
            />
            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-20 sm:px-16  md:px-12 lg:px-4 ">
                <div className="max-w-2xl lg:ml-20">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-7 mt-0 md:mt-[-50px] lg:mt-[-100px] md:mb-6 leading-tight drop-shadow-md font-playfair">
                    {items.title}
                  </h1>
                  <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl drop-shadow-sm font-poppins">
                    {items.subtitle}
                  </p>
                  <Link
                    to="/product"
                    className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 md:px-8 md:py-4
                    hover:bg-primary hover:text-white border-2 border-white/30 rounded-full transition-all duration-300 font-serif
                    shadow-md hover:shadow-lg group"
                  >
                    <span>View our Collections</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;