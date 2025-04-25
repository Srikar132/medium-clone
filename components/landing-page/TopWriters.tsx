"use client";
import React, { useEffect, useState } from "react";
import { writers } from "@/constants/writers";
import Cone from "@/components/design/Cone";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { animateGSAP } from "@/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TopWriters = () => {
  const [idx, setIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset animations when writer changes
    gsap.set(".quote-section, .writer-info", { opacity: 0, y: 20 });
    
    // Animate elements in
    const timeline = gsap.timeline();
    timeline.to(".quote-section", { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      ease: "power3.out"
    });
    timeline.to(".writer-info", { 
      opacity: 1, 
      y: 0, 
      duration: 0.7,
      ease: "power2.out" 
    }, "-=0.4");

  }, [idx]);

  const handleNavigation = (direction : string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === "next") {
      setIdx((prev) => (prev + 1) % writers.length);
    } else {
      setIdx((prev) => (prev - 1 + writers.length) % writers.length);
    }
    
    setTimeout(() => setIsAnimating(false), 800);
  };
  
  return (
    <section id="top-writers" className="common-padding screen-max-width-1700 min-h-screen relative flex flex-col justify-center py-20  overflow-hidden">
      <div className="absolute w-[50%] h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent left-1/2 top-0 -translate-x-1/2" />
      
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-purple-100/20 blur-3xl" />

      <div className="screen-max-width w-full mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <div className="relative">
            <div className="border-[3px] border-black/80 overflow-hidden w-20 h-20 md:w-28 md:h-28 flex items-center justify-center -rotate-45 shadow-lg transition-all duration-500 hover:shadow-xl bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={writers[idx].image as string}
                    alt={writers[idx].name! as string}
                    height={120}
                    width={120}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rotate-45 scale-110"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white" />
          </div>
          
          <div className="relative">
            <div className="scale-90 md:scale-100">
              <Cone />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 my-10 md:my-16">
          <div className="relative">
            <div className="absolute -left-8 top-0 text-8xl text-gray-100 font-serif">
              &ldquo;
            </div>
            <p className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight quote-section line-clamp-3 opacity-0 translate-y-10 leading-tight md:leading-tight relative z-10 pl-4">
              {writers[idx].quote}
            </p>
            <div className="absolute -right-2 bottom-0 text-8xl text-gray-100 font-serif">
              &rdquo;
            </div>
          </div>

          <div className="flex items-center gap-5 writer-info opacity-0 translate-y-10">
            <span className="w-12 h-1 rounded-xl bg-black/80" />
            <span className="text-xl md:text-2xl lg:text-3xl font-light">
              <span className="font-medium">{writers[idx].name}</span>
              <span className="text-black/60"> / {writers[idx].title}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="screen-max-width max-sm:flex-col gap-5 flex items-center justify-between mt-6  md:mt-10 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          {writers.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === i 
                  ? "w-8 bg-blue-500" 
                  : "w-3 bg-black/30 hover:bg-black/50"
              }`}
              aria-label={`View writer ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex  items-center gap-4">
          <button
            onClick={() => handleNavigation("prev")}
            className="rounded-full p-3 w-12 h-12 flex items-center justify-center cursor-pointer border border-black/60 hover:bg-black hover:text-white transition-all duration-300 hover:border-black"
            aria-label="Previous writer"
            disabled={isAnimating}
          >
            <BsArrowLeft className="text-lg" />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="rounded-full p-3 w-12 h-12 flex items-center justify-center cursor-pointer bg-black text-white border border-black hover:bg-blue-600 transition-all duration-300"
            aria-label="Next writer"
            disabled={isAnimating}
          >
            <BsArrowRight className="text-lg" />
          </button>
        </div>
      </div>
      
      {/* Content count indicator */}
      <div className="absolute bottom-8 right-8 font-mono text-lg text-black/40">
        <span className="text-blue-500 font-bold">{idx + 1}</span>
        <span>/</span>
        <span>{writers.length}</span>
      </div>
    </section>
  );
};

export default TopWriters;