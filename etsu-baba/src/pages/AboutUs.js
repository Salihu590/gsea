import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaBalanceScale,
  FaChartLine,
} from "react-icons/fa";

const AboutUs = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="px-6 py-12 font-montserrat text-gray-800">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-yellow-800">
          About Us
        </h1>
        <p className="text-lg text-gray-600">
          Etsu Baba Progressive Foundation is committed to preserving our
          cultural heritage, fostering unity among descendants, and driving
          community progress for a brighter future.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            icon: <FaBullseye size={40} />,
            title: "Our Mission",
            desc: "Promoting unity, innovation, and empowerment through cultural preservation and sustainable initiatives.",
          },
          {
            icon: <FaEye size={40} />,
            title: "Our Vision",
            desc: "Becoming a beacon of progress and transforming lives through shared values and collaboration.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-yellow-800 hover:text-white transition-all duration-300 group"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div className="mb-4 text-yellow-800 group-hover:text-white flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 group-hover:text-white">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-4">
          Who We Are
        </h2>
        <p className="text-gray-600 text-lg">
          We are a close-knit family of descendants from the great Etsu Baba,
          united by shared heritage, values, and commitment to community
          development. Our goal is to honor our past while shaping a progressive
          future.
        </p>
      </motion.div>

      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-800 mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaHandshake size={35} />,
              title: "Unity",
              desc: "Strength in togetherness for mutual growth.",
            },
            {
              icon: <FaBalanceScale size={35} />,
              title: "Integrity",
              desc: "Transparency and honesty in all dealings.",
            },
            {
              icon: <FaChartLine size={35} />,
              title: "Progress",
              desc: "Driving sustainable development and opportunities.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-yellow-800 hover:text-white transition-all duration-300 group"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
            >
              <div className="mb-4 text-yellow-800 group-hover:text-white flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="bg-gray-100 py-12 rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-800 mb-8">
          Our Heritage Journey
        </h2>
        <div className="relative pl-8 max-w-3xl mx-auto">
          <motion.div
            className="absolute top-0 bottom-0 left-[-2px] w-1.5 bg-yellow-800"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute left-[-8px] top-[0px] w-6 h-6 bg-yellow-800 rounded-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute left-[-8px] top-[110px] sm:top-[130px] w-6 h-6 bg-yellow-800 rounded-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.67, duration: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute left-[-8px] top-[220px] sm:top-[260px] w-6 h-6 bg-yellow-800 rounded-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.33, duration: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          {[
            {
              year: "1920",
              title: "The Beginning",
              desc: "Etsu Baba laid the foundation of our rich cultural values and traditions.",
            },
            {
              year: "1975",
              title: "Unity Strengthened",
              desc: "The descendants formed alliances to promote unity and cultural preservation.",
            },
            {
              year: "2024",
              title: "Foundation Established",
              desc: "Etsu Baba Progressive Foundation was officially launched to promote development.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-yellow-800">{item.year}</h3>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
