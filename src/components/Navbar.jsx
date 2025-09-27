import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ cart, setCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `hover:text-orange-400 transition ${
      isActive
        ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
        : ""
    }`;

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  {
    {
      /* Animasi ketika totalitem berubaah */
    }
  }
  useEffect(() => {
    if (totalItems > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleRemove = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 lg:px-14 bg-white dark:bg-black text-black dark:text-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-orange-500">
        <HiShoppingBag />
        <span>Toko Nusantara</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 font-medium">
        <NavLink to="/" className={navLinkClass} end>
          Homepage
        </NavLink>
        <NavLink to="/product" className={navLinkClass}>
          Product
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="text-orange-400 text-xl relative"
            onClick={() => setShowCart(!showCart)}
          >
            <FaShoppingCart />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform transition-transform ${
                  animateBadge ? "scale-125" : "scale-100"
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-4 z-50">
              {totalItems === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                  {Object.values(cart).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <button
                        className="text-red-500 font-bold"
                        onClick={() => handleRemove(item.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button className="hidden md:block bg-orange-500 hover:bg-orange-600 transition text-white py-2 px-4 rounded-full text-sm font-medium">
          Register Now
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl text-orange-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 shadow-lg flex flex-col items-center space-y-4 py-6 z-50 md:hidden">
          <NavLink
            to="/"
            className={navLinkClass}
            end
            onClick={() => setIsOpen(false)}
          >
            Homepage
          </NavLink>
          <NavLink
            to="/product"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Product
          </NavLink>
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <button className="bg-orange-500 hover:bg-orange-600 transition text-white py-2 px-6 rounded-full text-sm font-medium">
            Register Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
