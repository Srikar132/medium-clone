"use client";
import React, { useEffect, useState } from "react";
import { writers } from "@/constants/writers";
import Cone from "@/components/design/Cone";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { animateGSAP } from "@/utils"; // make sure path is correct
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TopWriters = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    animateGSAP(".quote-section", { opacity: 1, y: 0, duration: 1.2 }, {});
    animateGSAP(".writer-info", { opacity: 1, y: 0, duration: 1 }, {});
  }, [idx]);

  
  return (
    <section id="top-writers" className="common-padding md:h-screen relative mb-20 text-black mt-20">
      <div className="absolute w-[75%] h-px bg-black/60 left-1/2 top-0 -translate-x-1/2" />

      <div className="screen-max-width md:h-[80%] w-full mx-2 p-5">
        <div className="flex items-center justify-between">
          <div className="border-4 border-black overflow-hidden w-20 h-20 flex items-center justify-center -rotate-45">
            <Image
              src={writers[idx].image as string}
              alt="profile"
              height={24}
              width={24}
              className="w-24 h-24 object-cover rotate-45 scale-110"
            />
          </div>
          <div className="relative">
            <Cone />
          </div>
        </div>

        <div className="flex mt-3 flex-col gap-20 max-sm:mt-10">
          <p className="text-4xl md:text-5xl lg:text-8xl font-semibold tracking-wide quote-section line-clamp-3 opacity-0 translate-y-10 transition-all duration-500">
            {writers[idx].quote}
          </p>

          <div className="flex items-center gap-5 writer-info opacity-0 translate-y-10 transition-all duration-500">
            <span className="w-10 h-1 rounded-xl bg-black" />
            <span className="text-xl md:text-4xl">
              {writers[idx].name + " / " + writers[idx].title}
            </span>
          </div>
        </div>
      </div>

      <div className="screen-max-width flex items-center justify-between mt-10 px-5">
        <div className="flex items-center gap-4">
          {writers.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === i ? "bg-custom-sky-blue scale-125" : "bg-black"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setIdx((prev) => (prev - 1 + writers.length) % writers.length)
            }
            className="rounded-full p-3 w-10 h-10 cursor-pointer border border-black hover:bg-black hover:text-white transition-colors"
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={() => setIdx((prev) => (prev + 1) % writers.length)}
            className="rounded-full p-3 w-10 h-10 cursor-pointer border border-black hover:bg-black hover:text-white transition-colors"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopWriters;
