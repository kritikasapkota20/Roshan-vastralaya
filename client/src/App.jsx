import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
// import Product from "./pages/Product";
import ProductDetails from "./pages/productDetails";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import TopBar from "./components/TopBar";
import Gallery from "./pages/Gallery";
import CheckProduct from "./pages/CheckProduct";
import Events from "./pages/events";
import EventDetails from "./pages/eventDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <HelmetProvider>
      <TopBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<CheckProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/check" element={<CheckProduct />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </HelmetProvider>
  );
}

export default App;
