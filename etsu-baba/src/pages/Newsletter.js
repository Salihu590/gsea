import React from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-yellow-800 mb-4">
          Family Newsletter
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Stay connected with updates, announcements, and events from the Etsu
          Baba Progressive Foundation.
        </p>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 mb-6">
          Enter your email below to receive regular updates and stay informed
          about our activities.
        </p>

        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-800 outline-none"
            required
          />
          <motion.button
            type="submit"
            className="bg-yellow-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 20px rgba(202, 138, 4, 0.9)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2.5 },
            }}
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
