import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Gallery = () => {
  const galleryItems = [
    {
      src: "/images/gallery1.jpg",
      desc: "Historical portrait of the great Etsu Baba, founder of our lineage",
    },
    { src: "/images/gallery2.jpg", desc: "Youth members engaging in cultural discussions" },
    { src: "/images/gallery3.jpg", desc: "Community women’s group meeting" },
    { src: "/images/gallery4.jpg", desc: "Family heritage celebration" },
    { src: "/images/gallery5.jpg", desc: "Annual foundation meeting in January" },
    { src: "/images/gallery6.jpg", desc: "Leaders strategizing on future plans" },
    { src: "/images/gallery7.jpg", desc: "Cultural dance and festivities" },
    { src: "/images/gallery8.jpg", desc: "Descendants united for progress" },
    { src: "/images/gallery9.jpg", desc: "Children learning heritage values" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="px-6 py-12 font-montserrat text-gray-800">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-yellow-800">
          Our Gallery
        </h1>
        <p className="text-lg text-gray-600">
          A pictorial journey through generations - celebrating our parents,
          grandparents, great-grandparents, and every descendant of the great
          Etsu Baba.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div
              className="cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 sm:h-56 md:h-64 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition">
                View Image
              </div>
            </div>
            <p className="mt-2 text-center text-gray-700 text-sm font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-6 text-white text-3xl"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>
          <img
            src={galleryItems[currentIndex].src}
            alt="Full View"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            className="absolute right-6 text-white text-3xl"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
          <p className="absolute bottom-8 text-white text-lg font-medium text-center px-4">
            {galleryItems[currentIndex].desc}
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;