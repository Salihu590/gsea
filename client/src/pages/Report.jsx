import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

export default function Report() {
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const searchTimeoutRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate hook

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
      alert("Draft saved successfully!");
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
    
    // Get form data from the form reference
    const formData = new FormData(formRef.current);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Extract symptoms and environment factors into arrays
    const symptoms = Object.keys(data)
      .filter(key => key.startsWith('symptom-') && data[key] === 'on')
      .map(key => key.substring('symptom-'.length));
      
    const environment = Object.keys(data)
      .filter(key => key.startsWith('env-') && data[key] === 'on')
      .map(key => key.substring('env-'.length));
      
    // --- Validation Logic ---
    if (!location && !manualLocation.trim()) {
      alert("Please specify a location by using the map, searching, or using your current location.");
      setSubmitting(false);
      return;
    }

    if (symptoms.length === 0 && data.otherSymptoms.trim() === '') {
      alert("Please select at least one symptom or specify 'Other' symptoms.");
      setSubmitting(false);
      return;
    }

    if (environment.length === 0 && data.otherEnvironment.trim() === '') {
      alert("Please select at least one environmental factor or specify 'Other' factors.");
      setSubmitting(false);
      return;
    }

    // Create the final payload to send to the server
    const reportData = {
      ageGroup: data.ageGroup,
      symptoms,
      environment,
      symptomDuration: data.symptomDuration,
      location: location || { lat: null, lng: null, text: manualLocation },
    };

    try {
      const response = await fetch("http://localhost:3001/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        // Replace alert with navigation
        navigate("/results", { state: reportData });
        localStorage.removeItem("reportDraft");
        formRef.current.reset();
        setLocation(null);
        setManualLocation("");
      } else {
        const result = await response.json();
        alert(`Failed to submit report: ${result.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-12">
      <h1 className="text-4xl font-bold text-green-700">
        Report Your Symptoms
      </h1>
      <p className="mt-2 text-gray-600">
        Help your community stay safe. Share how you feel today.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-10">
        <div>
          <label className="block font-semibold mb-2">Age Group</label>
          <select
            name="ageGroup"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option>0–5</option>
            <option>6–17</option>
            <option>18–35</option>
            <option>36–60</option>
            <option>60+</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="block font-extrabold mb-4 text-2xl">
              Symptoms
            </label>
            <h4 className="font-semibold text-gray-900 mb-4">General</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
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
              ].map((symptom, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`symptom-${symptom}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{symptom}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`symptom-None`}
                  className="h-4 w-4 text-green-600"
                />
                <span>None</span>
              </label>
            </div>
            <h4 className="font-semibold text-gray-900 mb-4">Respiratory</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {[
                "Cough (more than 2 weeks)",
                "Coughing blood",
                "Sore throat",
              ].map((symptom, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`symptom-${symptom}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{symptom}</span>
                </label>
              ))}
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Severe / Alarming
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Seizures",
                "Jaundice (yellow eyes/skin)",
                "Bleeding (nose, eyes, mouth)",
                "Night sweats",
                "Rapid weight loss",
              ].map((symptom, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`symptom-${symptom}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{symptom}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              name="otherSymptoms"
              placeholder="Other (please specify)"
              className="mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-bold mb-4 text-2xl">
              Environment Notes
            </label>
            <h4 className="font-semibold text-gray-900 mb-4">
              Water-related risks
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Flooding nearby",
                "Stagnant/standing water",
                "Drinking unsafe water",
              ].map((risk, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`env-${risk}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{risk}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`env-None`}
                  className="h-4 w-4 text-green-600"
                />
                <span>None</span>
              </label>
            </div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Mosquito/bite risks
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Many mosquitoes in area",
                "Recent bush clearing",
                "Sleeping without mosquito net",
              ].map((risk, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`env-${risk}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{risk}</span>
                </label>
              ))}
            </div>
            <h4 className="font-semibold text-gray-900 mb-4">Air/Dust risks</h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Dusty area",
                "Indoor smoke (cooking fire)",
                "Poor ventilation",
              ].map((risk, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`env-${risk}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{risk}</span>
                </label>
              ))}
            </div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Food & Sanitation
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Ate street food",
                "Poor waste disposal nearby",
                "No access to clean toilet",
              ].map((risk, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`env-${risk}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{risk}</span>
                </label>
              ))}
            </div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Other stressors
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Extreme heat",
                "Recent rainfall",
                "Animals/livestock nearby",
              ].map((risk, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`env-${risk}`}
                    className="h-4 w-4 text-green-600"
                  />
                  <span>{risk}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              name="otherEnvironment"
              placeholder="Other environment factor (please specify)"
              className="mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-2xl">
            Duration of Symptoms
          </label>
          <select
            name="symptomDuration"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option>Less than 1 day</option>
            <option>1–3 days</option>
            <option>More than 3 days</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-2xl">Location</label>
          <div className="flex flex-col space-y-4 mb-4">
            <button
              type="button"
              onClick={handleGeoLocation}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
                  viewBox="0 0 24 24"
                >
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {loading ? "Fetching..." : "Use My Location"}
            </button>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {showMap ? "Hide Map" : "Use Map"}
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              name="manualLocation"
              value={manualLocation}
              onChange={handleSearchChange}
              placeholder="Search for a town or village"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            {searchResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <li
                    key={result.place_id}
                    onClick={() => handleResultClick(result)}
                    className="p-3 cursor-pointer hover:bg-gray-100 border-b"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {location && (
            <p className="mt-4 mb-2 text-sm text-gray-600">
              Selected: {location.text} <br />
              {location.lat &&
                `(Lat: ${location.lat.toFixed(3)}, Lng: ${location.lng.toFixed(
                  3
                )})`}
            </p>
          )}

          {showMap && (
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg h-80">
              <MapContainer
                center={location ? [location.lat, location.lng] : [9.667, 6.55]}
                zoom={location ? 14 : 7}
                scrollWheelZoom={false}
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

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={saveDraft}
            className="w-full sm:w-1/2 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={loadDraft}
            className="w-full sm:w-1/2 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            Load Draft
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-500 text-center">
        Your data is safe. All submissions are anonymous and help us track
        health trends in the community.
      </p>

      <p className="mt-2 text-sm text-gray-500 text-center">
        ⚠️ Disclaimer: This is not a medical diagnosis. Please consult a health
        worker for proper care.
      </p>
    </div>
  );
}
