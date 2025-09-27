"use client";
import React, { useEffect, useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaComments } from "react-icons/fa";
import gsap from "gsap";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    {
      {
        /* Animasi fade in ketika halaman dibuka */
      }
    }
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".fade-up"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-black text-black dark:text-white py-16 px-6 lg:px-20 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="fade-up text-4xl font-bold mb-6">
          About <span className="text-orange-500">Our App</span>
        </h2>

        {/* Description */}
        <p className="fade-up text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          This web application is designed to make your shopping experience
          faster, smarter, and easier. With a wide range of products, a smooth
          user interface, and advanced search features, we bring convenience
          right to your fingertips.
        </p>

        {/* Contact */}
        <div className="fade-up grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Email */}
          <div className="bg-gray-100 dark:bg-neutral-900 rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <FaEnvelope className="text-orange-500 text-3xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Get support via email
            </p>
            <a
              href="mailto:support@example.com"
              className="text-orange-500 font-semibold hover:underline"
            >
              admin@tokonusantara.com
            </a>
          </div>

          {/* Nomor Telepon */}
          <div className="bg-gray-100 dark:bg-neutral-900 rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <FaPhoneAlt className="text-orange-500 text-3xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Talk with our customer support
            </p>
            <a
              href="tel:+62123456789"
              className="text-orange-500 font-semibold hover:underline"
            >
              +621 234 567 789
            </a>
          </div>

          {/* Live Chat */}
          <div className="bg-gray-100 dark:bg-neutral-900 rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <FaComments className="text-orange-500 text-3xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Chat with our CS team directly
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-semibold transition">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
