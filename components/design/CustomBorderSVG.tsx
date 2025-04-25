export const CurvedBorderSVG = ({
  color = "#000",
  width = "100%",
  height = "auto",
  fill = "none"
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 195 70"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <defs>
        <filter
          id="shadow"
          x="-10"
          y="-10"
          width="215"
          height="90"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="6"
            floodColor="#1E1E2E"
          />
        </filter>
      </defs> */}
      <g filter="url(#shadow)">
        <path
          d="M9 9h140a9 9 0 0 1 9 9v9a9 9 0 0 0 9 9h19a9 9 0 0 1 9 9v9a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V18A9 9 0 0 1 9 9z"
          fill={fill}
          stroke={color}
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export const CurvedButton = ({ 
  text = "Mobile App Design", 
  color = "#000", 
  fill = "none", 
  width = "10rem",
  height = "3.5rem" 
}) => {
  return (
    <div
      className="relative inline-flex items-center "
      style={{
        width: width,
        height: height
      }}
    >
      <div className="w-full h-full">
        <CurvedBorderSVG color={color} fill={fill} />
      </div>
      <span
        className="absolute ml-5 font-bold whitespace-nowrap text-sm"
        style={{
          color: color
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const  PinkContainer = () => {
  return (
    <div className="relative  max-w-xl h-[22rem] py-8 px-3 ">
    <svg preserveAspectRatio="none" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-[37rem] ">
      <path d="M9 9h240a9 9 0 0 1 5 5v1a9 9 0 0 0 9 9h19a9 9 0 0 1 9 9v34a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V18A9 9 0 0 1 9 9z" fill="#fbb6ce" />
    </svg>  
    <div className="relative flex flex-col  py-7 px-4">
      <h2 className="text-3xl  font-black text-black ">Global partners</h2>
      <div className="grid grid-cols-2 gap-5 mt-7">
        <p className="mt-4text-sm  md:text-lg text-black">
          Agency that builds many amazing products to boost your business to
        </p>
        <p className="mt-4 text-sn md:text-lg text-black">
          We are officially partnered with world's best brands.
          Lorem ipsum dolor sit amet consectetu
        </p>
      </div>
    </div>
    <div className="absolute max-sm:top-10 top-7 right-0 bg-white w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full shadow-md border border-gray-200">
      <span className="text-black text-2xl">✦</span>
    </div>
  </div>
  );
}
