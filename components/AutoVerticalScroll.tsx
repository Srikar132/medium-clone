"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
const cardData = [
  { id: 1, date: "06", month: "Jun", title: "Day Advantages End Sufficient Eat Expression", author: "Jessica Smith" },
  { id: 2, date: "12", month: "Jun", title: "Remote Work Productivity Tips for 2025", author: "Michael Brown" },
  { id: 3, date: "18", month: "Jun", title: "The Future of Renewable Energy", author: "Sarah Johnson" },
  { id: 4, date: "24", month: "Jun", title: "AI in Modern Healthcare Systems", author: "David Lee" },
  { id: 5, date: "30", month: "Jun", title: "Sustainable Living in Urban Environments", author: "Emily Wilson" },
  { id: 6, date: "05", month: "Jul", title: "Effective Team Communication Strategies", author: "Robert Chen" },
];

export default function AutoScrollCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= cardData.length - 3 ? 0 : prevIndex + 1
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, [cardData.length]);
  
  return (
    <div className="w-full overflow-hidden relative" style={{ height: "300px" }}>
      <div 
        className="transition-transform duration-1000 ease-in-out" 
        style={{ 
          transform: `translateY(-${currentIndex * 100}px)`,
        }}
      >
        {cardData.map(card => (
          <div key={card.id} className="mb-4 h-24">
            <div className="flex items-center  dark:text-white p-4 rounded-lg  h-full">
              <div className="flex flex-col items-center mr-4">
                <span className="text-3xl font-bold">{card.date}</span>
                <span className="text-sm">{card.month}</span>
              </div>
              <div>
                <Link href={"/article"} className="font-medium dark:text-gray-100 hover:underline ">{card.title}</Link>
                <p className="text-sm dark:text-gray-400 mt-1">By {card.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}