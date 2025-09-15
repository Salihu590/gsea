import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStethoscope, FaLeaf, FaHospital, FaClinicMedical, FaPills, FaBell } from "react-icons/fa";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Socket.IO client
const socket = io("http://localhost:3001", {
  query: { location: JSON.stringify({ lat: null, lng: null }) },
});

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
        toast.info(
          `${data.message}\nSymptoms: ${data.symptoms.join(", ")}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      });
    }

    return () => {
      socket.off("new-report");
    };
  }, [location, notificationsEnabled]);

  return null;
}

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

    const { symptoms, environment, symptomDuration, ageGroup, location } = state;

    const matched = new Set();
    const tips = new Set();

    if (
      symptoms.some((s) =>
        ["Fever", "Headache", "Chills", "Fatigue", "Nausea"].includes(s)
      ) &&
      environment.some((e) =>
        ["Stagnant/standing water", "Many mosquitoes in area", "Sleeping without mosquito net"].includes(e)
      )
    ) {
      matched.add("Possible Malaria");
      tips.add("Use insecticide-treated mosquito nets, eliminate stagnant water, and seek medical care for antimalarial treatment.");
    }

    if (
      symptoms.includes("Cough (more than 2 weeks)") &&
      symptoms.some((s) => ["Night sweats", "Rapid weight loss", "Fever"].includes(s))
    ) {
      matched.add("Possible Tuberculosis");
      tips.add("Seek immediate medical evaluation for sputum testing and treatment. Avoid close contact with others until diagnosed.");
    }

    if (
      symptoms.some((s) => ["Fever", "Diarrhea", "Headache", "Nausea"].includes(s)) &&
      environment.some((e) => ["Drinking unsafe water", "Ate street food", "Poor waste disposal nearby"].includes(e))
    ) {
      matched.add("Possible Typhoid Fever");
      tips.add("Drink only boiled or bottled water. Seek medical care for antibiotic treatment.");
    }

    if (
      symptoms.includes("Diarrhea") &&
      symptoms.includes("Vomiting") &&
      environment.some((e) => ["Flooding nearby", "Poor waste disposal nearby", "Drinking unsafe water"].includes(e))
    ) {
      matched.add("Possible Cholera");
      tips.add("Prepare oral rehydration solution (ORS): 6 tsp sugar + 1/2 tsp salt in 1 liter of clean water. Seek urgent medical care.");
    }

    if (
      symptoms.includes("Jaundice (yellow eyes/skin)") &&
      symptoms.includes("Fever") &&
      environment.includes("Many mosquitoes in area")
    ) {
      matched.add("Possible Yellow Fever");
      tips.add("Seek immediate medical attention. Consider yellow fever vaccination for prevention.");
    }

    if (
      symptoms.some((s) => ["Fever", "Rash/Skin changes", "Body/Muscle Pain", "Headache"].includes(s)) &&
      environment.includes("Many mosquitoes in area")
    ) {
      matched.add("Possible Dengue Fever");
      tips.add("Rest, stay hydrated, and seek medical care. Avoid mosquito bites to prevent further spread.");
    }

    if (
      symptoms.some((s) => ["Headache", "Nausea", "Fatigue"].includes(s)) &&
      environment.includes("Extreme heat")
    ) {
      matched.add("Possible Heatstroke");
      tips.add("Move to a cool, shaded area, drink water, and apply cool cloths to the body. Seek medical help if symptoms worsen.");
    }

    if (
      symptoms.includes("Cough (more than 2 weeks)") &&
      environment.some((e) => ["Dusty area", "Indoor smoke (cooking fire)", "Poor ventilation"].includes(e))
    ) {
      matched.add("Possible Respiratory Infection (e.g., Pneumonia)");
      tips.add("Improve ventilation, avoid smoke exposure, and consult a health worker for evaluation.");
    }

    if (
      symptoms.some((s) => ["Diarrhea", "Vomiting", "Nausea"].includes(s)) &&
      environment.some((e) => ["No access to clean toilet", "Poor waste disposal nearby"].includes(e))
    ) {
      matched.add("Possible Gastrointestinal Infection");
      tips.add("Maintain hygiene, wash hands with soap, and drink clean water. Seek medical advice if symptoms persist.");
    }

    if (
      symptoms.some((s) =>
        ["Seizures", "Bleeding (nose, eyes, mouth)", "Jaundice (yellow eyes/skin)"].includes(s)
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
      tips.add("Avoid scratching and keep the area clean. Consult a health worker.");
    }

    if (environment.includes("Stagnant/standing water") || environment.includes("Many mosquitoes in area")) {
      tips.add("Remove standing water and use mosquito repellents.");
    }
    if (environment.includes("Poor ventilation") || environment.includes("Indoor smoke (cooking fire)")) {
      tips.add("Improve ventilation and use cleaner cooking fuels if possible.");
    }
    if (environment.includes("No access to clean toilet") || environment.includes("Poor waste disposal nearby")) {
      tips.add("Practice good hygiene and dispose of waste properly.");
    }

    if (symptomDuration === "More than 3 days") {
      tips.add("Symptoms lasting more than 3 days require medical evaluation.");
    }

    if (ageGroup === "0-5" || ageGroup === "60+") {
      tips.add("Young children and older adults are at higher risk. Seek medical care promptly.");
    }

    if (matched.size === 0) {
      matched.add("No specific condition matched. Monitor your symptoms and consult a health worker if they persist.");
      tips.add("Maintain good hygiene, stay hydrated, and rest. Seek medical advice if symptoms worsen.");
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
          const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: overpassQuery,
          });
          const data = await response.json();

          const facilities = data.elements.map((element) => ({
            name: element.tags.name || element.tags.amenity.charAt(0).toUpperCase() + element.tags.amenity.slice(1),
            lat: element.lat,
            lon: element.lon,
            type: element.tags.amenity,
          }));

          facilities.sort((a, b) => {
            const distA = Math.sqrt(
              Math.pow(a.lat - location.lat, 2) + Math.pow(a.lon - location.lng, 2)
            );
            const distB = Math.sqrt(
              Math.pow(b.lat - location.lat, 2) + Math.pow(b.lon - location.lng, 2)
            );
            return distA - distB;
          });

          setHealthFacilities(facilities.slice(0, 5));
        } catch (error) {
          setErrorFacilities("Unable to fetch nearby health facilities. Please try again later.");
        } finally {
          setLoadingFacilities(false);
        }
      };

      fetchHealthFacilities();
    } else {
      setErrorFacilities("Location data unavailable. Cannot fetch health facilities.");
    }
  }, [state, navigate]);

  const handleNotificationToggle = (enable) => {
    setNotificationsEnabled(enable);
    if (enable) {
      toast.success("Notifications enabled for nearby reports!");
      setShowNotificationCard(false); // Hide the card if user chooses to enable notifications
    } else {
      toast.info("Notifications disabled.");
    }
  };

  const toggleNotificationCard = () => {
    setShowNotificationCard(!showNotificationCard);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">Your Results</h1>
        <FaBell
          className={`text-2xl cursor-pointer transition-colors duration-200 ${notificationsEnabled ? 'text-green-600' : 'text-gray-400'}`}
          onClick={toggleNotificationCard}
          title="Toggle Notification Settings"
        />
      </div>

      <div className={`p-6 rounded-2xl shadow-md ${state && (state.ageGroup === "0-5" || state.ageGroup === "60+") ? "border-2 border-red-500 bg-white" : "bg-white"}`}>
        <h2 className="flex items-center text-xl font-semibold text-green-700 mb-3">
          <FaStethoscope className="mr-2" /> Possible Conditions
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          {conditions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          ⚠️ This is not a medical diagnosis. Please consult a health worker for proper evaluation and treatment.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="flex items-center text-xl font-semibold text-green-700 mb-3">
          <FaLeaf className="mr-2" /> WHO-Recommended Remedies & Tips
        </h2>
        {remedies.length > 0 ? (
          <ul className="list-disc ml-6 space-y-1">
            {remedies.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        ) : (
          <p>No specific remedies found. Consult a health worker.</p>
        )}
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="flex items-center text-xl font-semibold text-green-700 mb-3">
          <FaHospital className="mr-2" /> Nearest Health Facilities
        </h2>
        {loadingFacilities ? (
          <div className="flex justify-center items-center py-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
            <span className="ml-3 text-gray-600">Loading nearby health facilities...</span>
          </div>
        ) : errorFacilities ? (
          <p className="text-red-600">{errorFacilities}</p>
        ) : healthFacilities.length > 0 ? (
          <ul className="space-y-2">
            {healthFacilities.map((facility, i) => (
              <li key={i} className="flex items-center">
                {facility.type === "hospital" ? (
                  <FaHospital className="mr-2 text-green-600" />
                ) : facility.type === "clinic" ? (
                  <FaClinicMedical className="mr-2 text-green-600" />
                ) : (
                  <FaPills className="mr-2 text-green-600" />
                )}
                {facility.name}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${state.location.lat},${state.location.lng}&destination=${facility.lat},${facility.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  Get Directions
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No health facilities found nearby. Please consult a local health worker.</p>
        )}
      </div>

      {showNotificationCard && (
        <div className="p-6 bg-green-50 rounded-2xl shadow-inner">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Would you like to receive updates if others nearby report similar symptoms?
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleNotificationToggle(true)}
              className={`px-4 py-2 rounded-lg text-white ${
                notificationsEnabled ? "bg-green-800" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleNotificationToggle(false)}
              className={`px-4 py-2 rounded-lg text-white ${
                !notificationsEnabled ? "bg-gray-600" : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              No
            </button>
          </div>
        </div>
      )}

      <NotificationListener location={state.location} notificationsEnabled={notificationsEnabled} />
      <ToastContainer />
    </div>
  );
}
