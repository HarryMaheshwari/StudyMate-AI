import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Upload", path: "/upload" },
  { name: "Notes", path: "/notes" },
  { name: "Quiz", path: "/quiz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Close menu on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className="fixed top-4 w-full z-[100] px-4 flex justify-center" ref={navRef}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`w-full max-w-5xl rounded-3xl border transition-all duration-300 ${
          scrolled
            ? "bg-[#f5f5dc]/80 backdrop-blur-2xl border-black/5 shadow-xl scale-[0.98]"
            : "bg-[#f5f5dc]/90 border-black/10"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-black text-lg uppercase tracking-tighter flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full" />
            StudyMate
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase transition-all ${
                  location.pathname === link.path ? "bg-black text-[#f5f5dc]" : "hover:bg-black/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/login" className="px-5 py-2.5 bg-black text-[#f5f5dc] rounded-xl text-[11px] font-black uppercase hover:opacity-80 transition-opacity">
              Sign In
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"}`} />
            <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-black/5"
            >
              <div className="p-4 flex flex-col gap-2">
                {LINKS.map((link) => (
                  <Link key={link.path} to={link.path} className="px-4 py-3 font-bold uppercase text-xs hover:bg-black/5 rounded-lg" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
                <Link to="/login" className="bg-black text-[#f5f5dc] p-3 font-black uppercase text-xs rounded-lg text-center" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}