import React from "react";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaSearch,
  FaLeaf,
  FaHospital,
  FaUsers,
  FaFlask,
  FaTractor,
  FaMobileAlt,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

export default function About() {
  const heroBackgroundImage =
    "https://res.cloudinary.com/dsci2gspy/image/upload/v1755902115/africa-humanitarian-aid-doctor-taking-care-patient_bfcpcm.jpg";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 bg-gray-50">
      <section
        className="relative text-center py-16 sm:py-20 bg-cover bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight animate-[fadeInDown_1s_ease-out]">
            Global Symptom-Ecology Atlas (GSEA)
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_1.2s_ease-out]">
            A{" "}
            <span className="font-semibold text-green-300 hover:text-green-200 transition-colors duration-200">
              community-powered platform
            </span>{" "}
            that detects health threats early by collecting real-time symptom
            reports worldwide.
          </p>
          <Link
            to="/report"
            className="mt-8 inline-block px-8 py-4 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 animate-[fadeIn_1.5s_ease-out]"
            aria-label="Start reporting symptoms"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg text-center max-w-4xl mx-auto transition-all duration-300 animate-[fadeInUp_1s_ease-out]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight">
          Our Mission
        </h2>
        <p className="mt-4 text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          Empower{" "}
          <span className="font-semibold text-green-700 transition-colors duration-200 hover:text-green-500">
            every individual
          </span>
          , regardless of location, income, or literacy, to report symptoms and
          help prevent outbreaks before they spread.
        </p>
        <a
          href="#learn-more"
          className="mt-6 inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Learn more about our mission"
        >
          Learn More
        </a>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg max-w-4xl mx-auto space-y-6 animate-[fadeInUp_1.2s_ease-out] transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight text-center">
          The Problem We’re Solving
        </h2>
        <ul className="space-y-4 text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          <li className="flex items-start gap-3 group">
            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
            <p>
              Diseases often spread{" "}
              <span className="font-semibold text-green-700 group-hover:text-green-500 transition-colors duration-200">
                silently
              </span>{" "}
              before detection.
            </p>
          </li>
          <li className="flex items-start gap-3 group">
            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
            <p>
              Rural and low-resource communities are{" "}
              <span className="font-semibold text-green-700 group-hover:text-green-500 transition-colors duration-200">
                overlooked
              </span>{" "}
              in surveillance.
            </p>
          </li>
          <li className="flex items-start gap-3 group">
            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
            <p>
              Environmental factors like water or pollution are rarely{" "}
              <span className="font-semibold text-green-700 group-hover:text-green-500 transition-colors duration-200">
                tracked
              </span>{" "}
              with symptoms.
            </p>
          </li>
        </ul>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg max-w-5xl mx-auto space-y-8 animate-[fadeInUp_1.4s_ease-out] transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight text-center">
          How GSEA Helps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <article className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaGlobe
                className="text-green-700 text-2xl sm:text-3xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
              Crowdsourced Reporting
            </h3>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
              Report symptoms via web, SMS, WhatsApp, or voice, accessible to{" "}
              <span className="font-medium text-green-700 group-hover:text-green-500 transition-colors duration-200">
                everyone
              </span>
              .
            </p>
          </article>
          <article className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaSearch
                className="text-green-700 text-2xl sm:text-3xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
              Real-Time Detection
            </h3>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
              Identifies{" "}
              <span className="font-medium text-green-700 group-hover:text-green-500 transition-colors duration-200">
                early warning signs
              </span>{" "}
              of outbreaks from user data.
            </p>
          </article>
          <article className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaLeaf
                className="text-green-700 text-2xl sm:text-3xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
              Environmental Tracking
            </h3>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
              Connects symptoms to climate, pollution, and{" "}
              <span className="font-medium text-green-700 group-hover:text-green-500 transition-colors duration-200">
                environmental factors
              </span>
              .
            </p>
          </article>
          <article className="bg-white p-6 rounded-2xl shadow-md col-span-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-3">
              User Benefits
            </h3>
            <ul className="space-y-3 text-gray-800 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
                Explore possible conditions (not a diagnosis).
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
                Receive self-care tips tailored to your report.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
                Find nearby health centers for support.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-700 rounded-full group-hover:bg-green-500 transition-colors duration-200"></span>
                Opt-in for real-time health alerts.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg max-w-5xl mx-auto space-y-8 animate-[fadeInUp_1.6s_ease-out] transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight text-center">
          Who Can Use GSEA?
        </h2>
        <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto text-center">
          GSEA is designed to be accessible and valuable to a wide range of
          users, from individuals in remote areas to global health authorities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaUsers
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Everyday Citizen
            </h3>
            <p className="text-gray-700 text-sm">
              Individuals in any community, urban or rural.
            </p>
          </article>

          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaTractor
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Remote Communities
            </h3>
            <p className="text-gray-700 text-sm">
              Especially farmers and those with limited access to healthcare.
            </p>
          </article>

          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaHospital
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Health Workers
            </h3>
            <p className="text-gray-700 text-sm">
              For on-the-ground surveillance and resource planning.
            </p>
          </article>

          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaHandshake
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Public Health Agencies
            </h3>
            <p className="text-gray-700 text-sm">
              NGOs, governments, and disease control centers.
            </p>
          </article>

          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaFlask
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Researchers & WHO
            </h3>
            <p className="text-gray-700 text-sm">
              For studying global disease ecology and environmental links.
            </p>
          </article>

          <article className="bg-white p-5 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
              <FaMobileAlt
                className="text-green-700 text-2xl group-hover:text-green-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Mobile Users
            </h3>
            <p className="text-gray-700 text-sm">
              Anyone with a phone, with or without an internet connection.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg text-center max-w-4xl mx-auto transition-all duration-300 animate-[fadeInUp_1.8s_ease-out]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight">
          Our Vision
        </h2>
        <p className="mt-4 text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          To build a{" "}
          <span className="font-semibold text-green-700 transition-colors duration-200 hover:text-green-500">
            global early-warning health network
          </span>{" "}
          that protects overlooked communities by detecting threats before they
          become outbreaks.
        </p>
        <a
          href="#learn-more"
          className="mt-6 inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Learn more about our vision"
        >
          Learn More
        </a>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-lg max-w-5xl mx-auto space-y-10 animate-[fadeInUp_2s_ease-out] transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 tracking-tight text-center">
          Partners & Future Growth
        </h2>

        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 border-b pb-2 text-center">
            Our Key Collaborators
          </h3>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            GSEA collaborates with global institutions and local health
            organizations to expand our reach and validate our data. Our
            partners help translate early warnings into life-saving action.
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-xl sm:text-2xl font-semibold text-green-700 pt-2">
            <span className="p-2 border border-green-200 rounded-lg bg-green-50">
              WHO
            </span>
            <span className="p-2 border border-green-200 rounded-lg bg-green-50">
              CDC
            </span>
            <span className="p-2 border border-green-200 rounded-lg bg-green-50">
              UNICEF
            </span>
            <span className="p-2 border border-green-200 rounded-lg bg-green-50">
              Local Health Ministries
            </span>
          </div>
        </div>
        <hr className="border-gray-300" />

        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 border-b pb-2 text-center">
            Future Growth Pillars
          </h3>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            We are continuously innovating to increase coverage and predictive
            power, focusing on these key areas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <article className="bg-white p-5 rounded-2xl shadow-md text-center group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <FaChartLine className="text-green-700 text-3xl mx-auto mb-2" />
              <h4 className="font-semibold text-lg text-gray-900 mb-1">
                AI Predictive Modeling
              </h4>
              <p className="text-gray-700 text-sm">
                Enhancing algorithms for earlier and more localized outbreak
                forecasting.
              </p>
            </article>
            <article className="bg-white p-5 rounded-2xl shadow-md text-center group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <FaGlobe className="text-green-700 text-3xl mx-auto mb-2" />
              <h4 className="font-semibold text-lg text-gray-900 mb-1">
                Global Expansion
              </h4>
              <p className="text-gray-700 text-sm">
                Targeting 50+ new low-resource regions via localized SMS/Voice
                platforms.
              </p>
            </article>
            <article className="bg-white p-5 rounded-2xl shadow-md text-center group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <FaLeaf className="text-green-700 text-3xl mx-auto mb-2" />
              <h4 className="font-semibold text-lg text-gray-900 mb-1">
                Deep Environmental Data
              </h4>
              <p className="text-gray-700 text-sm">
                Integrating more precise environmental and ecological data
                sources.
              </p>
            </article>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Link
            to="/partner"
            className="inline-block px-6 py-3 border-2 border-green-700 text-green-700 font-semibold rounded-full shadow-md hover:bg-green-50 hover:border-green-600 hover:text-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Join as a health partner"
          >
            Join as a Health Partner
          </Link>
        </div>
      </section>

      <section className="p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 animate-[fadeInUp_2.2s_ease-out]">
        <Link
          to="/report"
          className="inline-block w-full md:w-auto px-8 py-4 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
          aria-label="Start reporting symptoms"
        >
          Start Reporting Symptoms
        </Link>

        <Link
          to="/network"
          className="inline-block w-full md:w-auto px-10 py-5 
                     bg-blue-600 text-white font-bold 
                     rounded-full shadow-xl hover:bg-blue-500 hover:shadow-2xl hover:scale-105 
                     transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-4
                     text-lg text-center 
                     order-first md:order-none"
          aria-label="Join our network"
        >
          JOIN OUR NETWORK
        </Link>
      </section>
    </main>
  );
}
