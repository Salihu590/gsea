import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-green-50 to-green-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight flex flex-col items-center lg:items-start gap-3">
            <span>Your Health Matters.</span>
            <span>Report it in Seconds.</span>
          </h1>

          <p className="mt-6 text-gray-700 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
            The Global Symptom-Ecology Atlas (GSEA) is a community-driven health
            platform that collects anonymous symptom reports and links them with
            environmental data to detect early warning signs of outbreaks
            especially in low resource settings.
          </p>

          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            By sharing your daily symptoms, you help protect your community and
            contribute to global health tracking.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.div whileHover={{ boxShadow: "0px 0px 15px #16a34a" }}>
              <Link
                to="/report"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold"
              >
                <Activity size={20} /> Report Symptoms
              </Link>
            </motion.div>

            <motion.div whileHover={{ boxShadow: "0px 0px 15px #22c55e" }}>
              <Link
                to="/about"
                className="flex items-center justify-center gap-2 border border-green-600 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold"
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
          className="flex-1 relative w-full h-[520px] flex justify-center items-center"
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <motion.img
              whileHover={{ boxShadow: "0px 0px 20px rgba(34,197,94,0.6)" }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755902115/africa-humanitarian-aid-doctor-taking-care-patient_bfcpcm.jpg"
              alt="Doctor consulting patient"
              className="rounded-2xl shadow-xl w-60 h-72 object-cover transform rotate-[-4deg]"
            />

            <motion.img
              whileHover={{ boxShadow: "0px 0px 20px rgba(34,197,94,0.6)" }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755901970/biologist-woman-examining-biological-slide-medical-expertise-using-microscope_gmre3b.jpg"
              alt="Healthcare teamwork"
              className="rounded-2xl shadow-xl w-60 h-72 object-cover transform rotate-[3deg] translate-y-6"
            />

            <motion.img
              whileHover={{ boxShadow: "0px 0px 25px rgba(34,197,94,0.7)" }}
              src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755901359/close-up-african-american-hand-holding-stethoscope_duwvko.jpg"
              alt="Ecology & environment"
              className="rounded-2xl shadow-xl w-full h-64 object-cover col-span-2 mx-auto -translate-y-4"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
