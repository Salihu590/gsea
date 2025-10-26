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
    <footer className="w-full bg-gradient-to-b from-green-950 to-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex items-start space-x-3">
          <img
            src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755809009/android-chrome-512x512_ovmktl.png"
            alt="GSEA Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">GSEA</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Global Symptom & Ecology Atlas — powered by community reports.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              { name: "Home", link: "/" },
              { name: "Report Symptoms", link: "/report" },
              { name: "About", link: "/about" },
              { name: "Contact", link: "/contact" },
            ].map((item, i) => (
              <li key={i}>
                <a href={item.link} className="hover:text-white transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-green-400" />
              <a
                href="mailto:info@gsea.org"
                className="hover:text-white transition"
              >
                info@gsea.org
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-green-400" />
              <a href="tel:+1234567890" className="hover:text-white transition">
                +1 234 567 890
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-green-400" />
              <a
                href="https://maps.google.com?q=Niger+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Niger, Nigeria
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            {[
              { icon: <FaWhatsapp />, link: "https://wa.me/1234567890" },
              { icon: <FaXTwitter />, link: "https://twitter.com/" },
              { icon: <FaInstagram />, link: "https://instagram.com/" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl transition transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-green-800 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Global Symptom & Ecology Atlas (GSEA) —
        Powered by community reports.
      </div>
    </footer>
  );
}
