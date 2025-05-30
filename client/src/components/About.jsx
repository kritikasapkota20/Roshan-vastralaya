import React from "react";
import { FaUserTie, FaLeaf, FaStar, FaTshirt, FaRegSmile, FaShippingFast } from "react-icons/fa";
import banner from "/banner2.jpeg"
import aboutimg from "/banner1.jpeg"
// import 
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f3e8ff] ">
      {/* Introduction Section */}
      <section className="py-16  bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-4 md:px-8">
            <div className="relative w-full">
              <img
                src={aboutimg}
                alt="Our Craft"
                className="rounded-xl shadow-xl transform hover:scale-105 transition duration-300 w-full h-auto object-cover md:h-[450px] md:object-[center_top] brightness-[.75]"
                style={{ position: "static" }}
              />
            </div>
            <div className="space-y-6 mt-4 text-justify">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              About Us
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At <span className="text-primary font-semibold">Roshan Vastralaya</span>, we believe clothing should empower you for every occasion. Our collection blends timeless tradition with everyday practicality, offering elegant sarees, kurtas, lehengas, and sherwanis that reflect cultural heritage while ensuring comfort and ease.
              {/* Each piece is crafted to bring out your confidence—whether it's for a festive celebration or a special family gathering. */}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Beyond traditional wear, we also focus on functional clothing designed for daily life. From breathable cottons to easy-care fabrics, our outfits are made to move with you—perfect for work, errands, or relaxed weekends. With Roshan Vastralaya, tradition meets modern living in every stitch.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <FaTshirt className="text-primary w-7 h-7" />
                <span className="text-gray-700 font-medium">Functional Designs</span>
              </div>
              <div className="flex items-center gap-3">
                <FaLeaf className="text-primary w-7 h-7" />
                <span className="text-gray-700 font-medium">Premium Fabrics</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUserTie className="text-primary w-7 h-7" />
                <span className="text-gray-700 font-medium">Tailored for You</span>
              </div>
              <div className="flex items-center gap-3">
                <FaStar className="text-primary w-7 h-7" />
                <span className="text-gray-700 font-medium">Trusted by Thousands</span>
              </div>
            </div>
          </div>
        
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gradient-to-br  from-[#e3f5fa] to-[#f5fbfd]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            What We Offer
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Showcasing stunning Sherwanis, Coats, Sarees, Lehengas, and formal wear designed to impress at every event. Unveil the beauty of cultural craftsmanship in our latest arrivals for men, women, and children.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <FaRegSmile className="w-10 h-10 text-primary mx-auto mb-3" />,
                title: "Comfort & Style",
                desc: "Outfits that feel as good as they look, for all-day confidence.",
              },
              {
                icon: <FaShippingFast className="w-10 h-10 text-primary mx-auto mb-3" />,
                title: "Ready for Every Function",
                desc: "From weddings to parties, find attire for every celebration.",
              },
              {
                icon: <FaLeaf className="w-10 h-10 text-primary mx-auto mb-3" />,
                title: "Cultural Craftsmanship",
                desc: "Handpicked fabrics and artisanal details in every piece.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;