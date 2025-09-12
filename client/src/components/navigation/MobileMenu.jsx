import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function MobileMenu({ setMenuOpen }) {
  const links = [
    { name: "Home", path: "/" },
    { name: "Report Symptoms", path: "/report" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className="md:hidden absolute top-14 sm:top-16 left-2 right-2 sm:left-3 sm:right-3 bg-white shadow-lg rounded-lg p-3 z-50 origin-top"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `block py-1.5 text-sm transition ${
              isActive
                ? "text-black font-bold border-l-4 border-black pl-2"
                : "text-black hover:text-green-600"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </motion.nav>
  );
}
