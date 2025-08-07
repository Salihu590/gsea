import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaCamera } from "react-icons/fa";

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
    <div className="px-6 py-12 font-montserrat text-gray-800 bg-gray-50">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-900 tracking-tight flex items-center justify-center gap-2">
          <FaCamera className="text-yellow-900 text-3xl" />
          Our Gallery
        </h1>
        <p className="text-lg text-gray-600">
          A pictorial journey through generations—celebrating our parents,
          grandparents, great-grandparents, and every descendant of the great
          Etsu Baba.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className="relative cursor-pointer group transition transform hover:scale-105 hover:shadow-2xl hover:brightness-105 duration-300 rounded-xl overflow-hidden bg-white"
          >
            <img
              src={item.src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-56 sm:h-64 object-cover rounded-xl transition-all duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition">
              View Image
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-4 py-2 text-sm font-medium">
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-all duration-300">
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
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-all duration-500"
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