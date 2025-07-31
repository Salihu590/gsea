import React, { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our History", href: "#history" },
    { name: "Activities", href: "#activities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="xl:hidden mr-4 text-yellow-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        <div className="w-12 h-12 rounded overflow-hidden">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 text-yellow-800 font-bold leading-tight font-montserrat">
          <span className="block text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            ETSU BABA
          </span>
          <span className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            PROGRESSIVE FOUNDATION
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:flex space-x-8 text-yellow-800 font-medium font-montserrat">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="hover:underline"
            whileHover={{ scale: 1.1, color: "#92400e" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link.name}
          </motion.a>
        ))}
      </nav>

      {/* Join Us Button */}
      <div className="flex items-center">
        <motion.a
          href="#join"
          className="bg-yellow-800 text-white px-4 py-2 rounded text-sm md:text-base whitespace-nowrap font-montserrat cursor-pointer"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#92400e",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Join Us
        </motion.a>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`xl:hidden absolute top-16 left-4 right-4 bg-white shadow-lg rounded-lg p-4 transform transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="block text-yellow-800 hover:underline py-2 font-montserrat"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link.name}
          </motion.a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
