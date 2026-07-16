import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Upload, FileText, Brain, LogOut, 
  Menu, X, Sparkles, BookOpen, Home, PlusCircle, User
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const MENU = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: FileText, label: 'Library', path: '/documents' },
  { icon: Brain, label: 'Quiz', path: '/quiz' },
];

const NavIcon = ({ icon: Icon, label, active }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.94 }}
    className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl cursor-pointer transition-all duration-300
      ${active ? 'bg-[#ececec] text-[#14161F]' : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A]'}`}
  >
    <Icon size={19} strokeWidth={2} />
    <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-[#18181B] px-3 py-1.5 text-xs font-medium text-[#E4E4E7] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 hidden lg:block">
      {label}
    </span>
  </motion.div>
);

// Ultra-compact mobile nav icon
const MobileNavIcon = ({ icon: Icon, active, label }) => {
  const isHome = label === 'Home';
  
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className={`relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
        ${active ? 'text-white' : 'text-[#A1A1AA]'}`}
    >
      <div className="relative">
       
        <Icon 
          size={20} 
          strokeWidth={active ? 2.5 : 2}
          className={`relative transition-all duration-300 ${active ? 'text-white' : ''}`}
        />
      </div>
      
     
    </motion.div>
  );
};

export default function Sidebar({ hideBottomNav = false }) {
  const { data: user } = useAuth();
  const logoutMutation = useLogout();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    setIsMobileMenuOpen(false);
    setTimeout(() => logoutMutation.mutate(), 300);
  };

  return (
    <>
      {/* ---- Desktop Sidebar ---- */}
      <aside className="hidden md:flex sticky top-4 w-20 lg:w-24 bg-zinc-900 border-[1px] border-zinc-800 flex-col items-center py-8 justify-between shrink-0 h-[calc(100vh-2rem)] ml-4 rounded-[2rem] z-50">
        <div className="w-11 h-11 rounded-2xl bg-[#C9A44C] flex items-center justify-center font-serif font-bold text-[#09090B] text-lg shadow-lg shadow-[#C9A44C]/10">
          S
        </div>
        
        <nav className="flex flex-col gap-2">
          {MENU.map((n) => (
            <NavLink key={n.label} to={n.path}>
              {({ isActive }) => <NavIcon icon={n.icon} label={n.label} active={isActive} />}
            </NavLink>
          ))}
        </nav>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout} 
          className="cursor-pointer text-[#71717A] hover:text-[#F4F4F5] transition-colors p-2 rounded-xl hover:bg-[#27272A]"
        >
          <LogOut size={19} strokeWidth={2} />
        </motion.div>
      </aside>

      {/* ---- Ultra-compact Floating Bottom Navigation ---- */}
      {!hideBottomNav && (
        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.5
            }}
            className="relative bg-[#09090B]/80 backdrop-blur-xl border border-[#27272A] rounded-full px-1.5 py-1 shadow-2xl shadow-black/50"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C9A44C]/5 via-transparent to-[#C9A44C]/5 blur-md pointer-events-none" />
            
            <div className="relative flex items-center justify-around">
              {MENU.map((n) => (
                <NavLink key={n.label} to={n.path} className="flex-1">
                  {({ isActive }) => (
                    <div className="flex flex-col items-center justify-center py-0.5">
                      <MobileNavIcon 
                        icon={n.icon} 
                        active={isActive} 
                        label={n.label}
                      />
                      <span className={`text-[7px] font-medium transition-colors duration-200
                        ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}
                      >
                        {n.label === 'Home' ? 'Home' : 
                         n.label === 'Upload' ? 'Upload' :
                         n.label === 'Library' ? 'Library' : 'Quiz'}
                      </span>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        </nav>
      )}
    </>
  );
}