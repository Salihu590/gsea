import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="/images/logo.png"
                alt="Etsu Baba Progressive Foundation Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <h2 className="text-xl font-bold tracking-tight">
                Etsu Baba Progressive Foundation
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">
              Preserving our heritage, empowering our communities, and building
              a prosperous future through unity and shared values.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/history">Our History</Link>
              </li>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/membership">Membership</Link>
              </li>
              <li>
                <Link to="/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link to="/newsletter">Newsletter</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <HiOutlineMail size={22} className="flex-shrink-0 text-white" />
                <a
                  href="mailto:infoetsubaba@gmail.com"
                  className="hover:underline hover:text-gray-300"
                >
                  infoetsubaba@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone
                  size={22}
                  className="flex-shrink-0 text-white"
                />
                <a
                  href="tel:+2349166743916"
                  className="hover:underline hover:text-gray-300"
                >
                  +234 916 674 3916
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone
                  size={22}
                  className="flex-shrink-0 text-white"
                />
                <a
                  href="tel:+2348053257701"
                  className="hover:underline hover:text-gray-300"
                >
                  +234 805 325 7701
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlinePhone
                  size={22}
                  className="flex-shrink-0 text-white"
                />
                <a
                  href="tel:+2348065699101"
                  className="hover:underline hover:text-gray-300"
                >
                  +234 806 569 9101
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <HiOutlineLocationMarker
                  size={22}
                  className="flex-shrink-0 text-white"
                />
                <a
                  href="https://www.google.com/maps?q=123+Heritage+Avenue+Cultural+District+Abuja+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-gray-300"
                >
                  123 Heritage Avenue
                  <br />
                  Cultural District, Abuja, Nigeria
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center border-t border-gray-600 pt-6 text-sm text-gray-200">
          &copy; {new Date().getFullYear()} Etsu Baba Progressive Foundation.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
