import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-green-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-start space-x-3">
          <img
            src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755809009/android-chrome-512x512_ovmktl.png"
            alt="GSEA Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">GSEA</h2>
            <p className="text-sm text-gray-300">
              Global Symptom & Ecology Atlas — powered by community reports.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/report" className="hover:text-white">
                Report Symptoms
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-green-400" />
              <a href="mailto:info@gsea.org" className="hover:text-white">
                info@gsea.org
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhone className="text-green-400" />
              <a href="tel:+1234567890" className="hover:text-white">
                +1 234 567 890
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-400" />
              <a
                href="https://maps.google.com?q=Niger+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Niger, Nigeria
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-green-700 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Global Symptom & Ecology Atlas (GSEA) —
        Powered by community reports.
      </div>
    </footer>
  );
}
