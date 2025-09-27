import React from "react";
import { GiPriceTag } from "react-icons/gi";
import PeopleImg from "../assets/People.png";
import { MdShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-5 lg:px-14 gap-12 pt-10 md:pt-0 transition-colors duration-300">
      {/* Left Content */}
      <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6">
        {/* Tagline */}
        <div className="inline-flex items-center mb-2 text-orange-500 font-medium text-lg">
          <GiPriceTag className="mr-2 text-2xl" /> Best Deals Everyday
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="shimmer">Toko Nusantara</span> is a{" "}
          <span className="shimmer">web-based</span>{" "}
          <span className="shimmer">e-commerce</span> platform{" "}
          <span className="shimmer">designed</span> to provide{" "}
          <span className="shimmer">online</span>{" "}
          <span className="shimmer">product</span> ordering{" "}
          <span className="shimmer">services</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
          Discover the best products and enjoy a hassle-free online shopping
          experience anytime, anywhere
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 text-center">
          <NavLink to="/product">
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold rounded-full px-6 py-3 shadow-lg flex items-center gap-2 transform hover:scale-105">
              <MdShoppingCart size={20} />
              Shop Now
            </button>
          </NavLink>
        </div>
      </div>{" "}
      {/* Right Content */}
      <div className="relative w-[300px] md:w-[400px] flex justify-center">
        {/* Shadow */}
        <div className="absolute bottom-3 w-3/4 h-4 bg-black/40 rounded-full blur-xl z-12"></div>
        <img
          src={PeopleImg}
          alt="People"
          className="w-full object-contain animate-float relative z-10"
        />
      </div>
    </section>
  );
};

export default Hero;
