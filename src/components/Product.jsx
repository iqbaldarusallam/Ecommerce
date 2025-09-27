"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import gsap from "gsap";
import CartModal from "./CartModal";

const Product = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const anim1 = useRef(null);
  const anim2 = useRef(null);

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

  const half = Math.ceil(filteredProducts.length / 2);
  const firstRow = filteredProducts.slice(0, half);
  const secondRow = filteredProducts.slice(half);

  useEffect(() => {
    if (search.length > 0) return;
    if (row1Ref.current) {
      const totalWidth = row1Ref.current.scrollWidth / 2;
      anim1.current = gsap.to(row1Ref.current, {
        x: -totalWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }
    if (row2Ref.current) {
      const totalWidth = row2Ref.current.scrollWidth / 2;
      anim2.current = gsap.to(row2Ref.current, {
        x: totalWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }
    return () => {
      anim1.current?.kill();
      anim2.current?.kill();
    };
  }, [filteredProducts, search]);

  const handlePause = () => {
    if (search.length === 0) {
      anim1.current?.pause();
      anim2.current?.pause();
    }
  };
  const handleResume = () => {
    if (search.length === 0) {
      anim1.current?.resume();
      anim2.current?.resume();
    }
  };

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
      className="min-w-[250px] bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition transform duration-300 p-5 flex flex-col"
    >
      <img
        src={item.image}
        alt={item.title}
        className="rounded-xl w-full h-48 object-contain mb-4 bg-gray-50 dark:bg-neutral-800"
      />
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

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300 overflow-hidden">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">
          Our <span className="shimmer">Products</span>
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Find the best products for your needs
        </p>
      </div>

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

      {search.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(renderCard)}
        </div>
      ) : (
        <>
          <div
            className="flex gap-6 mb-8"
            ref={row1Ref}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            {[...firstRow, ...firstRow].map(renderCard)}
          </div>
          <div
            className="flex gap-6 flex-row-reverse"
            ref={row2Ref}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            {[...secondRow, ...secondRow].map(renderCard)}
          </div>
        </>
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
