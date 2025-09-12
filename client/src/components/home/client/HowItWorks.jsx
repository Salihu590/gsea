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

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4">
          How It Works
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition text-center"
            >
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
