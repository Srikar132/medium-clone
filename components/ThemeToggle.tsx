"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggle = ({className} : {
  className? :string;
} ) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return (
    <div className="rounded-full w-5 h-5 border-2 border-white border-t-pink-500 animate-spin"></div>
  );

  const isDark = theme === "dark";

  return (
    <div 
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-12 h-5 rounded-full cursor-pointer flex items-center p-1 ${
        isDark ? "bg-[#3D4249]" : "bg-gray-500"
      } transition-colors duration-300 ${className}`}
    >
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <FaSun 
          className={`text-white/50 transition-opacity duration-300 ${isDark ? "opacity-40" : "opacity-100"}`} 
          size={14} 
        />
        <FaMoon 
          className={`text-slate-200 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-40"}`} 
          size={14} 
        />
      </div>
      <div 
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? "translate-x-5 " : "-translate-x-1 border border-black/40"
        }`}
      >
        {isDark ? (
          <FaMoon className="text-slate-700" size={12} />
        ) : (
          <FaSun className="text-white/50" size={12} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;