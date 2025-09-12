import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-green-50 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
        <a
          href="/"
          className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0 w-full sm:w-auto max-w-[70%] sm:max-w-[60%] lg:max-w-[50%]"
        >
          <img
            src="https://res.cloudinary.com/dsci2gspy/image/upload/v1755809009/android-chrome-512x512_ovmktl.png"
            alt="Logo"
            className="h-8 sm:h-9 lg:h-10 w-auto flex-shrink-0"
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-bold text-black text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg whitespace-nowrap">
              GLOBAL SYMPTOM ECOLOGY ATLAS
            </span>
            <span className="text-gray-600 text-[0.5rem] sm:text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] xl:text-xs whitespace-nowrap">
              Where a healthy planet begins with a single voice
            </span>
          </div>
        </a>

        <div className="hidden lg:block">
          <Navbar />
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-green-800 hover:text-green-600"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
}
