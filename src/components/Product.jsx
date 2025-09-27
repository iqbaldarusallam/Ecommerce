"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import CartModal from "./CartModal";

const Product = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const clothes = data.filter((item) =>
          item.category.toLowerCase().includes("clothing")
        );
        setProducts(clothes);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleSave = (quantity) => {
    setCart((prev) => {
      const currentQty = prev[selectedProduct.id]?.quantity || 0;
      return {
        ...prev,
        [selectedProduct.id]: {
          ...selectedProduct,
          quantity: currentQty + quantity,
        },
      };
    });
    setShowModal(false);
  };

  const renderCard = (item) => (
    <div
      key={item.id}
      className="product-card min-w-[250px] max-w-[250px] bg-white dark:bg-neutral-900 
                 rounded-2xl shadow-md hover:shadow-xl 
                 transform transition duration-300 hover:scale-105 
                 p-5 flex flex-col snap-start"
    >
      <div className="overflow-hidden rounded-xl mb-4 bg-gray-50 dark:bg-neutral-800">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 flex-grow">
        {item.description.length > 60
          ? item.description.substring(0, 60) + "..."
          : item.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-orange-500 font-bold">${item.price}</span>
        <button
          onClick={() => openModal(item)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-full text-sm transition"
        >
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  );

  {
    /* fungsi scroll manual */
  }
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300 relative">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">
          Our <span className="text-orange-500">Products</span>
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Find the best products for your needs
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center w-full max-w-md bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none px-3 text-black dark:text-white"
          />
        </div>
      </div>

      {/* Product List dengan Scroll Horizontal */}
      {search.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(renderCard)}
        </div>
      ) : (
        <div className="relative">
          {/* Tombol Panah Kiri */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-md"
          >
            <FaChevronLeft />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-10"
          >
            {filteredProducts.map(renderCard)}
          </div>

          {/* Tombol Panah Kanan */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-md"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal */}
      <CartModal
        show={showModal}
        product={selectedProduct}
        onClose={closeModal}
        onSave={handleSave}
        onRemove={(reduceQty) => {
          setCart((prev) => {
            const copy = { ...prev };
            const currentQty = copy[selectedProduct.id]?.quantity || 0;

            if (currentQty <= reduceQty) {
              delete copy[selectedProduct.id];
            } else {
              copy[selectedProduct.id].quantity = currentQty - reduceQty;
            }

            return copy;
          });
          closeModal();
        }}
      />
    </section>
  );
};

export default Product;
