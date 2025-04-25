import React from "react";

const StepsCard = ({ width = "400", height = "300" }) => (
  <svg 
    className=""
    width={width} 
    height={height} 
    viewBox="0 0 180 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <defs>
    <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="red" />
        <stop offset="50%" stopColor="blue" />
        <stop offset="100%" stopColor="purple"/>
      </linearGradient>
      <filter 
        id="shadow" 
        x="0" 
        y="0" 
        width="140%" 
        height="140%" 
        filterUnits="objectBoundingBox"
      >
        <feDropShadow 
          dx="0" 
          dy="0" 
          stdDeviation="4" 
          floodColor="rgba(33, 33, 52, 0.2)" 
        />
      </filter>
    </defs>
    <path 
      d='M10 90v-75a10 10 0 0 1 10 -10h140a10 10 0 0 1 10 10 v20a10 10 0 0 1 -10 10h-10a10 10 0 0 0 -10 10v5a10 10 0 0 1 -10 10h-30a10 10 0 0 0 -10 10v10'
      stroke='url(#gradientBorder)' 
      strokeWidth="1" 
      fill="none" 
      filter="url(#shadow)"
    />
  </svg>
);



export default StepsCard;