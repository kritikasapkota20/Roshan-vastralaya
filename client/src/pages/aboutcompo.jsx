import React from "react";
import banner from "/banner2.jpeg"


const AboutUs = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[400px] relative overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="w-full h-full object-cover md:object-[center_top] object-center absolute inset-0 brightness-[.75]"

          // className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 z-10" />
          
          {/* Content Container */}
          <div className="relative z-20 w-full h-full">
            <div className="absolute top-[30%] left-0 right-0 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
              <p className="text-white text-lg max-w-2xl mx-auto">
                We build smart apps, software, and websites to power your digital growth.
              </p>
            </div>
            
            <div className="absolute right-10 bottom-[20%]">
              <div className="flex flex-col items-end">
                <p className="text-white text-xl font-medium mb-3">Our Socials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right-side Diagonal Cut */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-white"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
            transform: 'translateY(50%)'
          }}
        />
      </div>
    </div>
  );
};
export default AboutUs;