import React from "react";
import { motion } from "framer-motion";

export default function Membership() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-yellow-800 mb-4">
          Membership
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Preserving heritage, strengthening unity, and honoring the legacy of
          Etsu Baba.
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.h2
          className="text-2xl font-semibold text-gray-800 mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Who Can Become a Member?
        </motion.h2>
        <p className="text-gray-700 mb-4">
          Membership in the Etsu Baba Progressive Foundation is
          <span className="font-semibold"> strictly confined </span>
          to the direct descendants of Etsu Baba. It is not open to the general
          public.
        </p>

        <motion.h2
          className="text-2xl font-semibold text-gray-800 mt-8 mb-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          How to Join
        </motion.h2>
        <p className="text-gray-700 mb-4">
          If you are a descendant of Etsu Baba and would like to be formally
          recognized as a member of the foundation, please reach out to the
          foundation administrators with proof of lineage.
        </p>
        <p className="text-gray-700 mb-6">
          To begin the process, kindly visit our{" "}
          <a
            href="/contact"
            className="text-yellow-800 font-medium hover:underline"
          >
            Contact Page
          </a>{" "}
          and submit your request.
        </p>

        <motion.div
          className="mt-10 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="/contact"
            className="inline-block bg-yellow-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 25px rgba(202, 138, 4, 0.9)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2.5 },
            }}
          >
            Start Membership Request
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
