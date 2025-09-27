import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaShoppingCart,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 py-10 px-6 md:px-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">Toko Nusantara</h2>
          <p className="mt-3 text-sm">
            Your trusted <span className="font-semibold">e-commerce</span>{" "}
            platform for the best deals every day. Shop with confidence and
            convenience.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>Shipping Information</li>
            <li>Returns & Refunds</li>
            <li>Payment Methods</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:col-span-3 text-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md hover:bg-orange-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md hover:bg-orange-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md hover:bg-orange-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md hover:bg-orange-500 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-gray-300 dark:border-neutral-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Toko Nusantara. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
