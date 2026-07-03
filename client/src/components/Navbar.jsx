import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 flex items-center justify-between px-8 border-b border-black text-black
        ${scrolled ? "py-3 bg-[#f5f5dc]/80 backdrop-blur-md" : "py-6 bg-[#f5f5dc]"}
      `}
    >
      <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
        StudyMate AI
      </Link>

      <div className="flex gap-8 font-bold uppercase text-sm">
        <Link to="/" className="hover:opacity-50">Home</Link>
        <Link to="/dashboard" className="hover:opacity-50">Dashboard</Link>
        <Link to="/upload" className="hover:opacity-50">Upload</Link>
        <Link to="/notes" className="hover:opacity-50">Notes</Link>
        <Link to="/quiz" className="hover:opacity-50">Quiz</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/login" className="px-5 py-2 border-2 border-black font-black uppercase text-sm hover:bg-black hover:text-[#f5f5dc] transition-colors">
          Login
        </Link>
        <Link to="/register" className="bg-black text-[#f5f5dc] px-5 py-2 font-black uppercase text-sm hover:opacity-80 transition-opacity">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}