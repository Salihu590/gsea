import React from "react";
import { motion } from "framer-motion";
import { FaLandmark, FaUsers, FaChartLine } from "react-icons/fa";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      className="relative w-full min-h-screen bg-no-repeat bg-top bg-contain flex flex-col justify-center"
      style={{
        backgroundImage: "url('/images/logo-bg.png')",
        backgroundColor: "#fff",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-full flex flex-col items-center text-center text-white px-4 pt-32 sm:pt-40">
        {/* Hero Text */}
        <motion.div
          className="max-w-3xl mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug font-montserrat"
            variants={fadeUp}
          >
            Welcome to Etsu Baba Progressive Foundation
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl"
            variants={fadeUp}
          >
            Empowering Communities through Unity and Heritage
          </motion.p>

          <motion.a
            href="#join"
            className="inline-block mt-6 bg-yellow-800 text-white px-6 py-3 rounded font-semibold text-lg shadow-md cursor-pointer"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#92400e",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Join Us
          </motion.a>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {[
            {
              icon: <FaLandmark size={40} />,
              title: "Our Heritage",
              desc: "Preserving and celebrating the rich cultural legacy of Etsu Baba and our ancestral heritage.",
            },
            {
              icon: <FaUsers size={40} />,
              title: "Unity",
              desc: "Strengthening bonds among descendants and fostering collaborative initiatives for collective progress.",
            },
            {
              icon: <FaChartLine size={40} />,
              title: "Progress",
              desc: "Driving sustainable development and empowerment through innovative community programs.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white text-yellow-900 rounded-lg shadow-lg p-6 text-center flex flex-col items-center justify-center"
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }} // ✅ Added tap effect
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-yellow-800 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
