import { motion } from "framer-motion";
import { Heart, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Impact() {
  const items = [
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: "For You",
      desc: "Early awareness of outbreaks near you.",
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: "For Your Community",
      desc: "Better preparedness and stronger health response.",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: "For the World",
      desc: "Data that strengthens global health protection.",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-green-100 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
          Why Participate?
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto my-6 rounded-full"></div>

        <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Every report strengthens the health of your community and the world.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 text-center"
            >
              <div className="flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="mt-3 text-gray-600 text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/report"
            className="inline-block px-10 py-4 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition"
          >
            Start Reporting Now
          </Link>
        </div>
      </div>
    </section>
  );
}
