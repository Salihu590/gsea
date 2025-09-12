import { NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Report Symptoms", path: "/report" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-5 xl:gap-6 text-black font-semibold">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `hover:text-green-600 transition text-[0.7rem] sm:text-sm md:text-base lg:text-lg ${
              isActive ? "underline underline-offset-4 decoration-black" : ""
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}
