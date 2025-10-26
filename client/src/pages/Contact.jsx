import React from "react";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaBolt,
} from "react-icons/fa";

export default function Contact() {
  const customStyles = `
   
    .contact-card {
      width: 100%;
      max-width: 400px;
      padding: 30px;
      background: #fff;
      border: 8px solid #000;
      box-shadow: 15px 15px 0 #000;
      transform: rotate(-2deg);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
    }
    .contact-card:hover {
      transform: rotate(0deg) scale(1.02);
      box-shadow: 20px 20px 0 #000;
    }
    .contact-card-input {
      padding: 12px;
      border: 4px solid #000;
      font-size: 16px;
      font-family: inherit;
      transition: all 0.3s ease;
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
    }
    .contact-card-input:focus {
      outline: none;
      transform: scale(1.02);
    }

   
    .button-green {
      --black-700: hsla(0 0% 12% / 1);
      --green-600: #059669; /* Tailwind green-600 */
      --green-500: #10b981; /* Tailwind green-500 */
      --green-400: #34d399; /* Tailwind green-400 */

      --border_radius: 9999px;
      --transtion: 0.3s ease-in-out;
      --offset: 2px;
      --active: 0; /* JS will toggle this on hover/focus/active */

      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center; /* Center content within the button */
      gap: 0.5rem;
      transform-origin: center;
      padding: 1rem 2rem;
      background-color: transparent;
      border: none;
      border-radius: var(--border_radius);
      transform: scale(calc(1 + (var(--active) * 0.1)));
      transition: transform var(--transtion);
      width: 100%; /* Make it full width like the form */
      box-sizing: border-box;
      margin-top: 10px; /* Space from textarea */
    }

    .button-green::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background-color: var(--black-700);
      border-radius: var(--border_radius);
      box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
        0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active))),
        0 0 0 calc(var(--active) * 0.375rem) var(--green-600); /* Green Focus Ring */
      transition: all var(--transtion);
      z-index: 0;
    }

    .button-green::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background-color: var(--green-500); /* Slightly lighter green for the glow */
      background-image: radial-gradient(
          at 51% 89%,
          var(--green-400) 0px, /* Lightest green for inner glow */
          transparent 50%
        ),
        radial-gradient(at 100% 100%, var(--green-500) 0px, transparent 50%),
        radial-gradient(at 22% 91%, var(--green-500) 0px, transparent 50%);
      background-position: top;

      opacity: var(--active);
      border-radius: var(--border_radius);
      transition: opacity var(--transtion);
      z-index: 2;
    }

    .button-green:is(:hover, :focus-visible) {
      --active: 1;
    }
    .button-green:active {
      transform: scale(1);
      /* Also set the active state on the JS variable */
      --active: 0.5;
    }

    .button-green .dots_border {
      --size_border: calc(100% + 2px);
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: var(--size_border);
      height: var(--size_border);
      background-color: transparent;
      border-radius: var(--border_radius);
      z-index: -10;
    }

    .button-green .dots_border::before {
      content: "";
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: left;
      /* transform: rotate(0deg); REMOVED duplicate */

      width: 100%;
      height: 2rem;
      background-color: white;

      mask: linear-gradient(transparent 0%, white 120%);
      animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }

    .button-green .sparkle {
      position: relative;
      z-index: 10;
      width: 1.75rem;
    }

    .button-green .sparkle .path {
      fill: currentColor;
      stroke: currentColor;
      transform-origin: center;
      color: hsl(0, 0%, 100%);
    }

    .button-green:is(:hover, :focus) .sparkle .path {
      animation: path 1.5s linear 0.5s infinite;
    }

    .button-green .sparkle .path:nth-child(1) { --scale_path_1: 1.2; }
    .button-green .sparkle .path:nth-child(2) { --scale_path_2: 1.2; }
    .button-green .sparkle .path:nth-child(3) { --scale_path_3: 1.2; }

    @keyframes path {
      0%, 34%, 71%, 100% { transform: scale(1); }
      17% { transform: scale(var(--scale_path_1, 1)); }
      49% { transform: scale(var(--scale_path_2, 1)); }
      83% { transform: scale(var(--scale_path_3, 1)); }
    }

    .button-green .text_button {
      position: relative;
      z-index: 10;
      background-image: linear-gradient(
        90deg,
        hsla(0 0% 100% / 1) 0%,
        hsla(0 0% 100% / var(--active)) 120%
      );
      background-clip: text;
      font-size: 1rem;
      font-weight: bold; /* Added bold for visibility */
      color: transparent;
    }

  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <section className="text-center mb-12 p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-2">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? We’d love to
            hear from you and collaborate on enhancing public health.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="contact-card">
              <h3 className="card__title">Send a Message</h3>
              <p className="card__subtitle">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
              <form className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="contact-card-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="contact-card-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="contact-card-input"
                  required
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="contact-card-input"
                  style={{ resize: "vertical" }}
                  required
                ></textarea>

                <button type="submit" className="button-green">
                  <div className="sparkle">
                    <FaBolt className="w-5 h-5 text-white" />
                  </div>
                  <span className="text_button">SEND MESSAGE</span>
                  <div className="dots_border"></div>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Official Contact Channels
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="text-xl text-green-500" />
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:gseahealth@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    gseahealth@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhone className="text-xl text-green-500" />
                  <span className="font-medium">Phone:</span>
                  <a
                    href="tel:+2348051749331"
                    className="text-blue-600 hover:underline"
                  >
                    +234 805 174 9331
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-xl text-green-500 mt-1" />
                  <div>
                    <span className="font-medium">Location:</span>
                    <p className="text-gray-700">Abuja, Nigeria</p>
                    <p className="text-sm text-gray-500">
                      Institutional link:{" "}
                      <a href="#nile" className="hover:underline text-gray-600">
                        Nile University of Nigeria
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                The GSEA Project Team
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-bold text-green-600">
                    Project Lead:
                  </span>{" "}
                  Salihu Baman Suleiman — Public Health & Full-Stack Developer
                </p>
                <p></p>
                <p className="text-sm italic pt-2 border-t mt-3">
                  <span className="font-semibold">Goal:</span> To enhance
                  community-level disease reporting and early outbreak detection
                  through digital surveillance.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg flex justify-center space-x-6">
              <a
                href="https://github.com/your-gsea-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 transition duration-300"
              >
                <FaGithub className="w-8 h-8" />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 transition duration-300"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a
                href="https://twitter.com/your-gsea-x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 transition duration-300"
              >
                <FaTwitter className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Our Location
          </h3>
          <iframe
            src="https://maps.google.com/maps?q=Nile%20University%20of%20Nigeria,%20Abuja&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="GSEA Project Location"
            className="rounded-lg shadow-inner"
          ></iframe>
        </div>

        <section className="mt-8 max-w-6xl mx-auto p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
          <p className="font-bold">⚠️ Important Note:</p>
          <p className="text-sm">
            GSEA is a digital health awareness and reporting platform. It does
            not replace professional medical diagnosis or consultation. For
            emergencies or personalized medical advice, please contact your
            nearest health facility or a licensed healthcare provider
            immediately.
          </p>
        </section>
      </div>
    </>
  );
}
