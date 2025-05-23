import { useEffect } from "react";
// import Newsletter from "../components/Newsletter";
import About from "../components/About";
import Product from "../pages/CheckProduct";
import Contact from "../pages/Contact";
import Banner from "../components/Banner";
import { useLocation } from "react-router-dom";
import FloatingIcons from "../components/floatingIcons";
import BlogSection from "./BlogSection";

const Home = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Banner />
       <About />
      <Product />
      <BlogSection />
      <Contact />
      {/* <Newsletter /> */}
      <FloatingIcons />
    </>
  );
};

export default Home;
