import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our History", path: "/history" },
    { name: "Activities", path: "/activities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-2 sm:px-3 md:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
      <div className="flex items-center flex-shrink-0 min-w-0">
        <button
          className="xl:hidden mr-1.5 sm:mr-2 text-yellow-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
              className="w-5 h-5 sm:w-6 sm:h-6"
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

        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded overflow-hidden flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dblqwnq79/image/upload/v1755440204/logo_uhqrwx.jpg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-1.5 sm:ml-2 md:ml-3 text-yellow-800 font-bold font-montserrat min-w-0">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight truncate">
            ETSU BABA
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight whitespace-nowrap">
            PROGRESSIVE FOUNDATION
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
        <nav className="hidden xl:flex space-x-3 xl:space-x-5 text-yellow-800 font-medium font-montserrat">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `hover:underline px-1 transition-colors ${
                  isActive ? "text-yellow-800 font-bold border-b-2 border-yellow-800" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#92400e",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="xl:ml-6"
        >
          <NavLink
            to="/about"
            className="bg-yellow-800 text-white px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded text-[11px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap font-montserrat cursor-pointer min-w-[80px] sm:min-w-[90px] text-center"
          >
            Learn More
          </NavLink>
        </motion.div>
      </div>

      <nav
        className={`xl:hidden absolute top-14 sm:top-16 left-2 right-2 sm:left-3 sm:right-3 bg-white shadow-lg rounded-lg p-3 transform transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `block py-1.5 font-montserrat text-sm ${
                isActive ? "text-yellow-800 font-bold border-l-4 border-yellow-800 pl-2" : "text-yellow-800"
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;