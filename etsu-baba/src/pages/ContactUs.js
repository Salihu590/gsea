import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Try again later.");
      return;
    }

    try {
      setLoading(true);
      const token = await executeRecaptcha("contact_form");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/contact`,
        { ...formData, token },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 font-montserrat text-gray-800">
      <ToastContainer position="top-center" />
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-yellow-800">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions or need assistance? We'd love to hear from you! Reach out to us using the details below or fill out the form.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">Get in Touch</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-800" /> 123 Heritage Avenue Cultural District, Abuja, Nigeria
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-800" />
              <a href="tel:+2349166743916" className="hover:text-yellow-700">+234 916 674 3916</a>
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-800" />
              <a href="tel:+2348053257701" className="hover:text-yellow-700">+234 805 325 7701</a>
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-800" />
              <a href="tel:+2348065699101" className="hover:text-yellow-700">+234 806 569 9101</a>
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-800" />
              <a href="mailto:infoetsubaba@gmail.com" className="hover:text-yellow-700">infoetsubaba@gmail.com</a>
            </p>
          </div>
          <div className="mt-6 flex gap-4 text-yellow-800">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600">
              <FaFacebookF size={22} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600">
              <FaXTwitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600">
              <FaInstagram size={22} />
            </a>
            <a href="https://wa.me/2348065699101" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600">
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-800"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-800"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-800"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-800"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-800 text-white font-bold py-3 px-6 rounded hover:bg-yellow-700 transition duration-300 w-full"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
    <ContactForm />
  </GoogleReCaptchaProvider>
);

export default ContactUs;