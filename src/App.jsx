import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/product";
import About from "./components/About";
import Footer from "./components/Footer";

const App = () => {
  const [cart, setCart] = useState({});

  return (
    <Router>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/product"
          element={<Product cart={cart} setCart={setCart} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
