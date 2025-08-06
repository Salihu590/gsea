import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Activities = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const images = [
    "/images/january-meeting-1.jpg",
    "/images/january-meeting-2.jpg",
    "/images/january-meeting-3.jpg",
    "/images/january-meeting-4.jpg",
    "/images/january-meeting-5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="px-6 py-12 font-montserrat text-gray-800">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-yellow-800">
          Our Activities
        </h1>
        <p className="text-lg text-gray-600">
          A glimpse into our recent gatherings and initiatives that keep our
          descendants united and progressive.
        </p>
      </div>

      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center relative"
        variants={fadeUp}
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-6">
          Our Recent Meeting
        </h2>
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Meeting Slide ${current + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-yellow-800 text-white p-2 rounded-full hover:bg-yellow-700 transition"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-yellow-800 text-white p-2 rounded-full hover:bg-yellow-700 transition"
          >
            <FaChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? "bg-yellow-800" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          Our January 2025 meeting focused on strengthening unity and planning
          cultural initiatives for the year ahead.
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-yellow-700 to-yellow-900 rounded-xl py-10 mb-16 text-center text-white shadow-lg max-w-3xl mx-auto"
        variants={fadeUp}
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          100% Descendant-Driven
        </h2>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Every activity, decision, and initiative is powered by our own people.
          Together, we honor our heritage and build a progressive future.
        </p>
      </motion.div>
    </div>
  );
};

export default Activities;
