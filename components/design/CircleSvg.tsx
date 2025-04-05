import React from "react";

const Circle = ({ width = "100%", height = "auto" }) => (
  <svg 
    // width={width} 
    // height={height} 
    viewBox="0 0 300 150" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    preserveAspectRatio="none"
    className="absolute scale-125 w-[400px] h-[200px] hidden lg:block bottom-0 left-1/2 -translate-x-2/3"
  >
    <path 
      d='M200 30a50 60 0 0 1 50 50h-10a50 60 0 0 1 -50 50v-10a50 60 0 0 1 -50 -50h10a50 60 0 0 1 50 -50v10z'
      strokeWidth="0" 
      fill="pink" 
    />
     <g transform="translate(195,75)">
      <polygon 
        points="0,-10  2,-3  10,0  3,2  0,10  -2,3  -10,0  -3,-2"
        fill="black"
        stroke="black"
        strokeWidth="1"
      />
    </g>
    <path 
      id="textPathCircle" 
      d="M223,80 A30,30 0 1,1 222.9,69.9"
      fill="none"
    />

    <text  className="z-10" fontSize="10" fill="black" textAnchor="middle">
      <textPath href="#textPathCircle" startOffset="50%">
      Medium lets your words shine and reach.
      </textPath>
    </text>
  </svg>
);


export default Circle;