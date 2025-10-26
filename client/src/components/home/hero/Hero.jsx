import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-white to-green-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left bg-white shadow-2xl rounded-3xl p-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-green-700">Your Health Matters.</span>
            <br />
            <span className="text-gray-900">Report it in Seconds.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
            The Global Symptom-Ecology Atlas (GSEA) is a community-driven health
            platform that collects anonymous symptom reports and links them with
            environmental data to detect early warning signs of outbreaks,
            especially in low-resource settings.
          </p>

          <p className="mt-3 text-gray-700 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            By sharing your daily symptoms, you help protect your community and
            contribute to global health tracking.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/report"
                // 💡 FIX: Reduce padding and text size on small screens (default)
                // Use 'sm:text-lg' and 'sm:px-8 sm:py-4' to revert to larger size on screens >= 640px
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full text-base font-bold shadow-lg transition duration-300 ease-in-out hover:shadow-green-500/50 sm:px-8 sm:py-4 sm:text-lg"
              >
                <Activity size={20} /> Report Symptoms
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/about"
                // 💡 FIX: Apply the same styling adjustments for consistency
                className="flex items-center justify-center gap-2 border border-green-600 hover:border-green-700 text-green-700 hover:text-green-800 px-5 py-3 rounded-full text-base font-bold transition duration-300 ease-in-out hover:bg-green-50/50 sm:px-8 sm:py-4 sm:text-lg"
              >
                <BookOpen size={20} /> Why It Matters
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative w-full h-[500px] flex justify-center items-center"
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full h-full max-w-lg max-h-lg bg-green-300 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10 p-4">
            <motion.img
              whileHover={{ scale: 1.03, rotate: -6 }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755902115/africa-humanitarian-aid-doctor-taking-care-patient_bfcpcm.jpg"
              alt="Doctor consulting patient"
              className="rounded-2xl shadow-xl w-60 h-64 object-cover transform rotate-[-4deg] transition duration-500 ease-in-out"
            />

            <motion.img
              whileHover={{ scale: 1.03, rotate: 5 }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755901970/biologist-woman-examining-biological-slide-medical-expertise-using-microscope_gmre3b.jpg"
              alt="Healthcare teamwork"
              className="rounded-2xl shadow-xl w-60 h-64 object-cover transform rotate-[3deg] translate-y-8 transition duration-500 ease-in-out"
            />

            <motion.img
              whileHover={{ scale: 1.03 }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755901359/close-up-african-american-hand-holding-stethoscope_duwvko.jpg"
              alt="Ecology & environment"
              className="rounded-2xl shadow-xl w-full h-56 object-cover col-span-2 mx-auto -translate-y-4 transition duration-500 ease-in-out"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
