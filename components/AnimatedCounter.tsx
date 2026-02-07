"use client"

import React, { useEffect, useState } from 'react';

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
        <p className="lg:text-4xl sm:text-2xl md:text-3xl text-slate-800 dark:text-white mb-2 z-50 font-serif font-bold">{count}</p>
        <p className="text-xl text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
};

export default AnimatedCounter
