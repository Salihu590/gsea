import { FaClipboardList, FaStethoscope, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaClipboardList className="w-12 h-12 text-green-600" />,
      title: "Report Symptoms",
      desc: "Fill a short symptom form about how you feel. Your report helps build the bigger picture.",
    },
    {
      icon: <FaStethoscope className="w-12 h-12 text-green-600" />,
      title: "Get Instant Tips",
      desc: "See possible causes, home remedies, and nearby health centers based on your symptoms.",
    },
    {
      icon: <FaShieldAlt className="w-12 h-12 text-green-600" />,
      title: "Stay Safe Together",
      desc: "Your report adds to the community map and helps give early warnings for outbreaks.",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, type: "spring" },
    }),
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4">
          How It Works
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-14 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition"
            >
              <span className="absolute -top-4 -left-4 bg-green-600 text-white w-10 h-10 flex items-center justify-center font-bold rounded-full shadow-md">
                {i + 1}
              </span>
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-black">{step.title}</h3>
              <p className="mt-3 text-gray-600 text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}