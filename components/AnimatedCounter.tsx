"use client"

import React, { useState , useEffect } from 'react';

interface AnimatedCounterProps {
  value: number,
  label: string,
  icon: React.ReactNode
}

const AnimatedCounter = ({ value, label, icon }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!value) return;
    
    let start = 0;
    const end = parseInt(value.toString());
    const duration = 2000; 
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div className=''>
        <p className="lg:text-4xl sm:text-2xl md:text-3xl mb-2 z-50 text-slate-800 font-serif font-bold">{count}</p>
        <p className="text-xl text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default AnimatedCounter