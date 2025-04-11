"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggle = () => {
    const {theme , setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
  
    if (!mounted) return null;



  return (
    <button
        onClick={() => setTheme(theme ==  "dark" ? "light" : "dark" )}
        className={`px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer `}
    >
        {theme == "dark" ? <FaSun size={20} /> 
        : <FaMoon className="text-black dark:text-white" size={20} />
        }
    </button>
  )
}

export default ThemeToggle