import React from "react";
import { motion } from "framer-motion";
import { FaLandmark, FaUsers, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <>
      <section
        className="relative w-full h-auto bg-no-repeat bg-top bg-contain flex flex-col justify-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dblqwnq79/image/upload/v1755440204/logo_uhqrwx.jpg')",
          backgroundColor: "#fff",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 w-full flex flex-col items-center text-center text-white px-4 pt-32 sm:pt-40 pb-8 md:pb-12">
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

            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "#92400e",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block mt-6"
            >
              <Link
                to="/about"
                className="bg-yellow-800 text-white px-6 py-3 rounded font-semibold text-lg shadow-md cursor-pointer"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-8"
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
                whileTap={{ scale: 0.95 }}
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

      <section className="bg-yellow-900 text-white text-center py-16 px-4">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h2
            className="text-2xl sm:text-4xl font-extrabold mb-4"
            variants={fadeUp}
          >
            Preserve Our Legacy
          </motion.h2>

          <motion.p className="text-base sm:text-lg mb-8" variants={fadeUp}>
            Learn more about our history, values, and vision as we keep the
            heritage of Etsu Baba alive for future generations.
          </motion.p>

          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "#92400e",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/about"
                className="border border-white text-white px-6 py-3 rounded font-semibold text-lg cursor-pointer"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f3f3f3",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/contact"
                className="bg-white text-yellow-800 px-6 py-3 rounded font-semibold text-lg cursor-pointer"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
