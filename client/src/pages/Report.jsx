import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  Loader2,
  MapPin,
  Search,
  Save,
  Upload,
  RefreshCcw,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ location, setLocation, setManualLocation }) {
  const map = useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });

      map.flyTo(e.latlng, map.getZoom());

      const reverseGeocode = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
          );
          const data = await response.json();
          const placeName = data.display_name || "Unnamed Location";
          setLocation((prevLocation) => ({
            ...prevLocation,
            text: placeName,
          }));
          setManualLocation(placeName);
        } catch (error) {
          console.error("Error with reverse geocoding:", error);
          setManualLocation("Unnamed Location");
        }
      };

      reverseGeocode();
    },
  });

  return location === null ? null : (
    <Marker position={[location.lat, location.lng]} />
  );
}

const Loader = () => (
  <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function ReportForm() {
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const searchTimeoutRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDraft = localStorage.getItem("reportDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (formRef.current) {
          Object.keys(draft).forEach((key) => {
            const input = formRef.current.elements[key];
            if (input) {
              if (input.type === "checkbox") {
                input.checked = draft[key];
              } else {
                input.value = draft[key];
              }
            }
          });
          if (draft.location) {
            setLocation(draft.location);
          }
          if (draft.manualLocation) {
            setManualLocation(draft.manualLocation);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved draft:", e);
      }
    }
  }, []);

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const placeName = data.display_name || "Current Location (unnamed)";
            setLocation({ lat: latitude, lng: longitude, text: placeName });
            setManualLocation(placeName);
          } catch (error) {
            console.error("Error with reverse geocoding:", error);
            setLocation({
              lat: latitude,
              lng: longitude,
              text: "Current Location (error fetching name)",
            });
            setManualLocation("Current Location");
          } finally {
            setLoading(false);
            setShowMap(true);
          }
        },
        () => {
          alert(
            "Unable to fetch location. Please enter manually or use the search."
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation not supported on this device.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setManualLocation(query);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length > 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
          );
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    setLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      text: result.display_name,
    });
    setManualLocation(result.display_name);
    setSearchResults([]);
    setShowMap(true);
  };

  const saveDraft = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const draft = {
        location,
        manualLocation,
      };
      for (let [key, value] of formData.entries()) {
        draft[key] = value;
      }
      localStorage.setItem("reportDraft", JSON.stringify(draft));
      alert("Draft saved successfully! (Not all input types are saved)");
    }
  };

  const loadDraft = () => {
    const savedDraft = localStorage.getItem("reportDraft");
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      if (formRef.current) {
        Object.keys(draft).forEach((key) => {
          const input = formRef.current.elements[key];
          if (input) {
            if (input.type === "checkbox") {
              input.checked = draft[key];
            } else {
              input.value = draft[key];
            }
          }
        });
      }
      if (draft.location) {
        setLocation(draft.location);
      }
      if (draft.manualLocation) {
        setManualLocation(draft.manualLocation);
      }
      alert("Draft loaded successfully!");
    } else {
      alert("No saved draft found.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(formRef.current);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const symptoms = Object.keys(data)
      .filter((key) => key.startsWith("symptom-") && data[key] === "on")
      .map((key) => key.substring("symptom-".length));

    const environment = Object.keys(data)
      .filter((key) => key.startsWith("env-") && data[key] === "on")
      .map((key) => key.substring("env-".length));

    if (!location && !manualLocation.trim()) {
      alert(
        "Please specify a location by using the map, searching, or using your current location."
      );
      setSubmitting(false);
      return;
    }

    if (symptoms.length === 0 && data.otherSymptoms.trim() === "") {
      alert("Please select at least one symptom or specify 'Other' symptoms.");
      setSubmitting(false);
      return;
    }

    if (environment.length === 0 && data.otherEnvironment.trim() === "") {
      alert(
        "Please select at least one environmental factor or specify 'Other' factors."
      );
      setSubmitting(false);
      return;
    }

    const reportData = {
      ageGroup: data.ageGroup,
      symptoms,
      otherSymptoms: data.otherSymptoms.trim(),
      environment,
      otherEnvironment: data.otherEnvironment.trim(),
      symptomDuration: data.symptomDuration,
      location: location || { lat: null, lng: null, text: manualLocation },
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (true) {
        navigate("/results", { state: reportData });
        localStorage.removeItem("reportDraft");
        formRef.current.reset();
        setLocation(null);
        setManualLocation("");
      } else {
        alert("Failed to submit report. Please check the console.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const checkboxClasses =
    "h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500";
  const sectionTitleClasses =
    "text-xl font-semibold mb-4 text-green-700 border-b pb-2";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-4xl font-extrabold text-green-700 text-center lg:text-left">
        Report Your Symptoms
      </h1>
      <p className="mt-2 text-gray-600 text-center lg:text-left">
        Your anonymous report helps track health trends and detect early warning
        signs.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className={sectionTitleClasses}>Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ageGroup" className={labelClasses}>
                Age Group
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                className={inputClasses}
                defaultValue="18–35"
              >
                <option value="0–5">0–5</option>
                <option value="6–17">6–17</option>
                <option value="18–35">18–35</option>
                <option value="36–60">36–60</option>
                <option value="60+">60+</option>
              </select>
            </div>

            <div>
              <label htmlFor="symptomDuration" className={labelClasses}>
                Duration of Symptoms
              </label>
              <select
                id="symptomDuration"
                name="symptomDuration"
                className={inputClasses}
                defaultValue="Less than 1 day"
              >
                <option value="Less than 1 day">Less than 1 day</option>
                <option value="1–3 days">1–3 days</option>
                <option value="More than 3 days">More than 3 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className={sectionTitleClasses}>Symptom Checklist</h2>

            <h4 className="font-semibold text-gray-900 mb-3 text-lg">
              General Symptoms
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
              {[
                "Fever",
                "Headache",
                "Fatigue",
                "Body/Muscle Pain",
                "Nausea",
                "Vomiting",
                "Diarrhea",
                "Chills",
                "Rash/Skin changes",
                "None",
              ].map((symptom, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    name={`symptom-${symptom}`}
                    className={checkboxClasses}
                  />
                  <span>{symptom}</span>
                </label>
              ))}
            </div>

            <h4 className="font-semibold text-gray-900 mb-3 text-lg">
              Respiratory/Severe
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                "Cough (more than 2 weeks)",
                "Coughing blood",
                "Sore throat",
                "Seizures",
                "Jaundice (yellow eyes/skin)",
                "Bleeding (nose, eyes, mouth)",
                "Night sweats",
                "Rapid weight loss",
              ].map((symptom, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    name={`symptom-${symptom}`}
                    className={checkboxClasses}
                  />
                  <span>{symptom}</span>
                </label>
              ))}
            </div>

            <label htmlFor="otherSymptoms" className={labelClasses}>
              Other Symptoms (if not listed)
            </label>
            <input
              id="otherSymptoms"
              type="text"
              name="otherSymptoms"
              placeholder="e.g., Eye pain, difficulty breathing"
              className={inputClasses}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className={sectionTitleClasses}>Environmental Factors</h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Water & Sanitation
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Flooding nearby",
                    "Stagnant/standing water",
                    "Drinking unsafe water",
                    "Poor waste disposal nearby",
                    "No access to clean toilet",
                    "None (Env)",
                  ].map((risk, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        name={`env-${risk}`}
                        className={checkboxClasses}
                      />
                      <span>{risk.replace(" (Env)", "")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 mt-4">
                  Pest & Habitat Risks
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Many mosquitoes in area",
                    "Recent bush clearing",
                    "Sleeping without mosquito net",
                    "Animals/livestock nearby",
                  ].map((risk, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        name={`env-${risk}`}
                        className={checkboxClasses}
                      />
                      <span>{risk}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 mt-4">
                  Air Quality & Stressors
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Dusty area",
                    "Indoor smoke (cooking fire)",
                    "Poor ventilation",
                    "Extreme heat",
                    "Recent rainfall",
                    "Ate street food",
                  ].map((risk, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        name={`env-${risk}`}
                        className={checkboxClasses}
                      />
                      <span>{risk}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <label
              htmlFor="otherEnvironment"
              className={labelClasses + " mt-4"}
            >
              Other Environmental Factors
            </label>
            <input
              id="otherEnvironment"
              type="text"
              name="otherEnvironment"
              placeholder="e.g., Crowded shelter, pollution"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className={sectionTitleClasses}>Location Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button
              type="button"
              onClick={handleGeoLocation}
              className="col-span-1 md:col-span-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <MapPin size={20} className="mr-2" />
                  <span>Use My Current Location</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              {showMap ? "Hide Map" : "Search/Use Map"}
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              name="manualLocation"
              value={manualLocation}
              onChange={handleSearchChange}
              placeholder="Search for a town or village (or edit selected location)"
              className={inputClasses}
            />
            {searchResults.length > 0 && (
              <ul className="absolute z-30 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl">
                {searchResults.map((result) => (
                  <li
                    key={result.place_id}
                    onClick={() => handleResultClick(result)}
                    className="p-3 text-sm cursor-pointer hover:bg-green-50 border-b last:border-b-0"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {location && (
            <p className="mt-3 text-sm text-gray-600 p-2 bg-green-50 rounded">
              <span className="font-semibold text-green-700">
                Selected Location:
              </span>{" "}
              {location.text} <br />
              {location.lat &&
                `(Lat: ${location.lat.toFixed(3)}, Lng: ${location.lng.toFixed(
                  3
                )})`}
            </p>
          )}

          {showMap && (
            <div className="mt-6 rounded-lg overflow-hidden shadow-2xl h-80 border border-gray-200">
              <MapContainer
                center={location ? [location.lat, location.lng] : [9.667, 6.55]}
                zoom={location ? 14 : 7}
                scrollWheelZoom={true}
                className="z-10"
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                  location={location}
                  setLocation={setLocation}
                  setManualLocation={setManualLocation}
                />
              </MapContainer>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={saveDraft}
            className="flex items-center justify-center py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            <Save size={20} className="mr-2" /> Save Draft
          </button>
          <button
            type="button"
            onClick={loadDraft}
            className="flex items-center justify-center py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            <RefreshCcw size={20} className="mr-2" /> Load Draft
          </button>

          <button
            type="submit"
            className="flex items-center justify-center py-3 bg-green-600 text-white font-semibold rounded-lg shadow-xl hover:bg-green-700 transition disabled:bg-green-400"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Upload size={20} className="mr-2" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Your data is safe. All submissions are anonymous and contribute to
          global health tracking.
        </p>
        <p className="mt-2 text-xs text-red-500 text-center font-medium">
          ⚠️ Disclaimer: This is not a medical diagnosis. Please consult a
          health worker for proper care.
        </p>
      </div>
    </div>
  );
}
