"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

const MenuButton = ({
  isOpen,
  toggle
} : {
  isOpen : boolean;
  toggle : () => void
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
 

  return (
    <button
      className="relative w-12 h-12 flex items-center justify-center transition-all  rounded overflow-hidden group"
      aria-label="Menu"
      onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => toggle()}
    >
      <div className={`absolute transition-all duration-300 ${isHovered || isOpen ? 'opacity-0 scale-75' : 'opacity-100'}`}>
        <Menu size={40} className="scale-x-105" />
      </div>
      
      <div 
        className={`absolute w-5 h-1 bg-current rounded-full transition-all duration-500 ${
          isHovered || isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      />
      
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${
          isHovered || isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          style={{
            transform: `translateX(${isHovered || isOpen ? '100%' : '-100%'})`,
            transition: 'transform 0.6s ease-out'
          }}
        />
      </div>
      
      <div 
        className={`absolute inset-0 bg-white dark:bg-secondary-dark transition-transform duration-500 rounded-sm ${
          isHovered || isOpen ? 'scale-100' : 'scale-0'
        } flex-center`}
      >
        <div className="w-[50%]  h-px rounded-lg bg-black dark:bg-white "></div>
      </div>
    </button>
  );
};

export default MenuButton;