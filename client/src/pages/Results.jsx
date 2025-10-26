import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Stethoscope,
  Leaf,
  Hospital,
  Syringe,
  Pill,
  Bell,
  ArrowRight,
  X,
  Loader2,
  MapPin,
  TriangleAlert,
} from "lucide-react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

// Initialize Socket.IO client (Logic Unchanged)
const socket = io("http://localhost:3001", {
  query: { location: JSON.stringify({ lat: null, lng: null }) },
});

// -----------------------------------------------------------
// 1. Notification Listener Component (Logic Unchanged)
// -----------------------------------------------------------
function NotificationListener({ location, notificationsEnabled }) {
  useEffect(() => {
    if (location && location.lat && location.lng) {
      const locationQuery = { lat: location.lat, lng: location.lng };
      const currentQuery = socket.io.opts.query.location;
      if (JSON.stringify(locationQuery) !== currentQuery) {
        socket.io.opts.query = { location: JSON.stringify(locationQuery) };
        socket.disconnect().connect();
      }
    }

    if (notificationsEnabled) {
      socket.on("new-report", (data) => {
        toast.info(`${data.message}\nSymptoms: ${data.symptoms.join(", ")}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }

    return () => {
      socket.off("new-report");
    };
  }, [location, notificationsEnabled]);

  return null;
}

// -----------------------------------------------------------
// 2. Main Results Component
// -----------------------------------------------------------
export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [conditions, setConditions] = useState([]);
  const [remedies, setRemedies] = useState([]);
  const [healthFacilities, setHealthFacilities] = useState([]);
  const [loadingFacilities, setLoadingFacilities] = useState(false);
  const [errorFacilities, setErrorFacilities] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationCard, setShowNotificationCard] = useState(true);

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

    const { symptoms, environment, symptomDuration, ageGroup, location } =
      state;

    const matched = new Set();
    const tips = new Set();

    if (
      symptoms.some((s) =>
        ["Fever", "Headache", "Chills", "Fatigue", "Nausea"].includes(s)
      ) &&
      environment.some((e) =>
        [
          "Stagnant/standing water",
          "Many mosquitoes in area",
          "Sleeping without net",
        ].includes(e)
      )
    ) {
      matched.add("Possible Malaria");
      tips.add(
        "Use insecticide-treated mosquito nets, eliminate stagnant water, and seek medical care for antimalarial treatment."
      );
    }

    if (
      symptoms.includes("Cough (more than 2 weeks)") &&
      symptoms.some((s) =>
        ["Night sweats", "Rapid weight loss", "Fever"].includes(s)
      )
    ) {
      matched.add("Possible Tuberculosis");
      tips.add(
        "Seek immediate medical evaluation for sputum testing and treatment. Avoid close contact with others until diagnosed."
      );
    }

    if (
      symptoms.some((s) =>
        ["Fever", "Diarrhea", "Headache", "Nausea"].includes(s)
      ) &&
      environment.some((e) =>
        [
          "Drinking unsafe water",
          "Ate street food",
          "Poor waste disposal nearby",
        ].includes(e)
      )
    ) {
      matched.add("Possible Typhoid Fever");
      tips.add(
        "Drink only boiled or bottled water. Seek medical care for antibiotic treatment."
      );
    }

    if (
      symptoms.includes("Diarrhea") &&
      symptoms.includes("Vomiting") &&
      environment.some((e) =>
        [
          "Flooding nearby",
          "Poor waste disposal nearby",
          "Drinking unsafe water",
        ].includes(e)
      )
    ) {
      matched.add("Possible Cholera");
      tips.add(
        "Prepare oral rehydration solution (ORS): 6 tsp sugar + 1/2 tsp salt in 1 liter of clean water. Seek urgent medical care."
      );
    }

    if (
      symptoms.includes("Jaundice (yellow eyes/skin)") &&
      symptoms.includes("Fever") &&
      environment.includes("Many mosquitoes in area")
    ) {
      matched.add("Possible Yellow Fever");
      tips.add(
        "Seek immediate medical attention. Consider yellow fever vaccination for prevention."
      );
    }

    if (
      symptoms.some((s) =>
        ["Fever", "Rash/Skin changes", "Body/Muscle Pain", "Headache"].includes(
          s
        )
      ) &&
      environment.includes("Many mosquitoes in area")
    ) {
      matched.add("Possible Dengue Fever");
      tips.add(
        "Rest, stay hydrated, and seek medical care. Avoid mosquito bites to prevent further spread."
      );
    }

    if (
      symptoms.some((s) => ["Headache", "Nausea", "Fatigue"].includes(s)) &&
      environment.includes("Extreme heat")
    ) {
      matched.add("Possible Heatstroke");
      tips.add(
        "Move to a cool, shaded area, drink water, and apply cool cloths to the body. Seek medical help if symptoms worsen."
      );
    }

    if (
      symptoms.includes("Cough (more than 2 weeks)") &&
      environment.some((e) =>
        ["Dusty area", "Indoor smoke", "Poor ventilation"].includes(e)
      )
    ) {
      matched.add("Possible Respiratory Infection (e.g., Pneumonia)");
      tips.add(
        "Improve ventilation, avoid smoke exposure, and consult a health worker for evaluation."
      );
    }

    if (
      symptoms.some((s) => ["Diarrhea", "Vomiting", "Nausea"].includes(s)) &&
      environment.some((e) =>
        ["No access to clean toilet", "Poor waste disposal nearby"].includes(e)
      )
    ) {
      matched.add("Possible Gastrointestinal Infection");
      tips.add(
        "Maintain hygiene, wash hands with soap, and drink clean water. Seek medical advice if symptoms persist."
      );
    }

    if (
      symptoms.some((s) =>
        [
          "Seizures",
          "Bleeding (nose, eyes, mouth)",
          "Jaundice (yellow eyes/skin)",
        ].includes(s)
      )
    ) {
      matched.add("Severe symptoms detected");
      tips.add("Seek emergency medical care immediately.");
    }

    if (symptoms.includes("Diarrhea")) {
      tips.add("Stay hydrated with oral rehydration solution (ORS).");
    }
    if (symptoms.includes("Fever")) {
      tips.add("Rest, stay hydrated, and use a damp cloth to reduce fever.");
    }
    if (symptoms.includes("Cough (more than 2 weeks)")) {
      tips.add("Try steam inhalation and avoid irritants like smoke.");
    }
    if (symptoms.includes("Rash/Skin changes")) {
      tips.add(
        "Avoid scratching and keep the area clean. Consult a health worker."
      );
    }

    if (
      environment.includes("Stagnant/standing water") ||
      environment.includes("Many mosquitoes in area")
    ) {
      tips.add("Remove standing water and use mosquito repellents.");
    }
    if (
      environment.includes("Poor ventilation") ||
      environment.includes("Indoor smoke")
    ) {
      tips.add(
        "Improve ventilation and use cleaner cooking fuels if possible."
      );
    }
    if (
      environment.includes("No access to clean toilet") ||
      environment.includes("Poor waste disposal nearby")
    ) {
      tips.add("Practice good hygiene and dispose of waste properly.");
    }

    if (symptomDuration === "More than 3 days") {
      tips.add("Symptoms lasting more than 3 days require medical evaluation.");
    }

    if (ageGroup === "0–5" || ageGroup === "60+") {
      tips.add(
        "Young children and older adults are at higher risk. Seek medical care promptly."
      );
    }

    if (matched.size === 0) {
      matched.add(
        "No specific condition matched. Monitor your symptoms and consult a health worker if they persist."
      );
      tips.add(
        "Maintain good hygiene, stay hydrated, and rest. Seek medical advice if symptoms worsen."
      );
    }

    setConditions(Array.from(matched));
    setRemedies(Array.from(tips));

    if (location && location.lat && location.lng) {
      const fetchHealthFacilities = async () => {
        setLoadingFacilities(true);
        setErrorFacilities(null);
        try {
          const overpassQuery = `
            [out:json];
            (
              node["amenity"="hospital"](around:10000,${location.lat},${location.lng});
              node["amenity"="clinic"](around:10000,${location.lat},${location.lng});
              node["amenity"="pharmacy"](around:10000,${location.lat},${location.lng});
            );
            out body;
          `;
          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: overpassQuery,
            }
          );
          const data = await response.json();

          const facilities = data.elements.map((element) => ({
            name:
              element.tags.name ||
              element.tags.amenity.charAt(0).toUpperCase() +
                element.tags.amenity.slice(1),
            lat: element.lat,
            lon: element.lon,
            type: element.tags.amenity,
          }));

          facilities.sort((a, b) => {
            const distA = Math.sqrt(
              Math.pow(a.lat - location.lat, 2) +
                Math.pow(a.lon - location.lng, 2)
            );
            const distB = Math.sqrt(
              Math.pow(b.lat - location.lat, 2) +
                Math.pow(b.lon - location.lng, 2)
            );
            return distA - distB;
          });

          setHealthFacilities(facilities.slice(0, 5));
        } catch (error) {
          setErrorFacilities(
            "Unable to fetch nearby health facilities. Please try again later."
          );
        } finally {
          setLoadingFacilities(false);
        }
      };

      fetchHealthFacilities();
    } else {
      setErrorFacilities(
        "Location data unavailable. Cannot fetch health facilities."
      );
    }
  }, [state, navigate]);

  const handleNotificationToggle = (enable) => {
    setNotificationsEnabled(enable);
    if (enable) {
      toast.success("Notifications enabled for nearby reports!");
      setShowNotificationCard(false);
    } else {
      toast.info("Notifications disabled.");
      setShowNotificationCard(false);
    }
  };

  const toggleNotificationCard = () => {
    setShowNotificationCard(!showNotificationCard);
  };

  const isPriorityAge =
    state && (state.ageGroup === "0–5" || state.ageGroup === "60+");

  const getFacilityIcon = (type) => {
    switch (type) {
      case "hospital":
        return <Hospital size={20} className="text-red-500 flex-shrink-0" />;
      case "clinic":
        return <Syringe size={20} className="text-blue-500 flex-shrink-0" />;
      case "pharmacy":
        return <Pill size={20} className="text-green-500 flex-shrink-0" />;
      default:
        return <MapPin size={20} className="text-gray-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 font-montesserat">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 tracking-tight">
            Your Health Report
          </h1>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Bell
              className={`text-3xl cursor-pointer transition-colors duration-300 ${
                notificationsEnabled ? "text-green-600" : "text-gray-400"
              }`}
              onClick={toggleNotificationCard}
              title="Toggle Notification Settings"
            />
            {notificationsEnabled && (
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
            )}
          </motion.div>
        </div>

        {isPriorityAge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 border-2 border-red-300 rounded-xl shadow-md flex items-center space-x-3"
          >
            <TriangleAlert size={24} className="text-red-600 flex-shrink-0" />

            <p className="text-base font-semibold text-red-700">
              **Priority Age Group Alert:** Given the age group (
              {state.ageGroup}), we recommend **seeking professional medical
              advice promptly**.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ translateY: -3 }}
            transition={{ duration: 0.3 }}
            className={`p-6 bg-white rounded-2xl shadow-xl border border-gray-100 h-full ${
              isPriorityAge ? "border-red-400" : ""
            }`}
          >
            <h2 className="flex items-center text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-100">
              <Stethoscope size={24} className="mr-2 text-green-600" /> Possible
              Conditions
            </h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-base leading-relaxed">
              {conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <p className="mt-5 pt-3 border-t border-gray-100 text-sm text-gray-500 leading-normal">
              <span className="font-bold text-red-500">⚠️ Disclaimer:</span>{" "}
              This is not a medical diagnosis. Consult a health worker.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ translateY: -3 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 h-full"
          >
            <h2 className="flex items-center text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-100">
              <Leaf size={24} className="mr-2 text-green-600" /> Essential Tips
              & Remedies
            </h2>
            {remedies.length > 0 ? (
              <ul className="list-disc ml-6 space-y-2 text-gray-700 text-base leading-relaxed">
                {remedies.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-base leading-relaxed">
                No specific remedies found. Consult a health worker.
              </p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="flex items-center text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-100">
            <Hospital size={24} className="mr-2 text-green-600" /> Nearest
            Health Facilities
          </h2>
          {loadingFacilities ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-green-500" />
              <span className="mt-3 text-base text-gray-600">
                Loading nearby health facilities...
              </span>
            </div>
          ) : errorFacilities ? (
            <p className="text-red-600 text-base font-medium leading-relaxed">
              {errorFacilities}
            </p>
          ) : healthFacilities.length > 0 ? (
            <div className="space-y-3">
              {healthFacilities.map((facility, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-green-50 transition-colors duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    {getFacilityIcon(facility.type)}
                    <span className="font-medium text-gray-800 text-base">
                      {facility.name}
                    </span>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://www.google.com/maps/dir/${state.location.lat},${state.location.lng}/${facility.lat},${facility.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-semibold text-green-600 hover:text-green-800 transition-all duration-200 border-b-2 border-green-200 hover:border-green-600 pb-0.5"
                  >
                    Get Directions <ArrowRight size={16} className="ml-1" />
                  </motion.a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-base leading-relaxed">
              No health facilities found nearby. Please consult a local health
              worker.
            </p>
          )}
        </motion.div>

        {showNotificationCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative p-6 bg-green-50 border-2 border-green-300 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-3">
              <Bell size={24} className="text-green-700 flex-shrink-0" />
              <h2 className="text-lg font-semibold text-green-800">
                Receive Alerts for Nearby Reports?
              </h2>
            </div>

            <button
              onClick={toggleNotificationCard}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              title="Close"
            >
              <X size={20} />
            </button>

            <div className="flex space-x-4">
              <motion.button
                onClick={() => handleNotificationToggle(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  notificationsEnabled
                    ? "bg-green-800 text-white shadow-lg"
                    : "bg-green-600 text-white hover:bg-green-700 shadow-md"
                }`}
              >
                Yes
              </motion.button>
              <motion.button
                onClick={() => handleNotificationToggle(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  !notificationsEnabled
                    ? "bg-gray-600 text-white shadow-lg"
                    : "bg-gray-400 text-white hover:bg-gray-500 shadow-md"
                }`}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        <NotificationListener
          location={state.location}
          notificationsEnabled={notificationsEnabled}
        />
        <ToastContainer />

        <footer className="pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Data provided by OpenStreetMap & Overpass API.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200 text-base"
          >
            Submit New Report
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
