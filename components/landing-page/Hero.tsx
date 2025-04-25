"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BiBrain } from "react-icons/bi";
import { BsArrow90DegUp, BsEar } from "react-icons/bs";
import Link from "next/link";
import Circle from "../design/CircleSvg";
import { CurvedButton, PinkContainer } from "../design/CustomBorderSVG";
import StepsCard from "../design/StepCard";
import { useRef } from "react";
import CurvedRhombus from "../design/CurvedRhombus";

function Hero() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const thoughtsRef = useRef(null);

  useGSAP(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero header animations
    const tl = gsap.timeline();

    tl.fromTo(
      "#heading-text",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    )
      .fromTo(
        "#subheading",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .fromTo(
        ".curved-button",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.2"
      );

    // Steps card animation
    gsap.fromTo(
      "#steps-card-container",
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#steps-card-container",
          start: "top 80%",
        },
      }
    );

    // Get Access button animation
    gsap.fromTo(
      "#get-access-btn",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: "#steps-card-container",
          start: "top 80%",
        },
      }
    );

    // Stats & Partners section animations
    gsap.fromTo(
      "#partners-card",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#partners-card",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      "#stats-card",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#stats-card",
          start: "top 85%",
        },
      }
    );

    // Testimonial section
    gsap.fromTo(
      "#testimonial-card",
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#testimonial-card",
          start: "top 80%",
        },
      }
    );

    // Thought section animations
    const thoughtsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#thoughts-section",
        start: "top 70%",
      },
    });

    thoughtsTimeline
      .fromTo(
        "#brac-left",
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      )
      .fromTo(
        "#head-text",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        "#brac-right",
        {
          opacity: 0,
          x: 30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        "#text-paragraph",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .fromTo(
        "#thoughts-image",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="w-full screen-max-width-1700  mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-16 overflow-hidden"
    >
      {/* Hero Header Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
        <div className="flex flex-col">
          <h1
            id="heading-text"
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-black leading-[1.1] max-md:text-center"
          >
            Share Ideas,
            <br />
            Spark Conversations,
            <br />
            Inspire the World
          </h1>

          <h2
            id="subheading"
            className="text-sm md:text-xl font-light mt-5 text-black/70 max-md:text-center"
          >
            <span className="font-bold uppercase text-xl tracking-wider">
              J
            </span>
            oin millions of writers and readers sharing their stories.
          </h2>

          <div className="flex mt-8 md:mt-10 flex-wrap gap-3 max-md:justify-center">
            <div className="curved-button">
              <CurvedButton text="blogging" width="10rem" height="3.5rem" />
            </div>
            <div className="curved-button">
              <CurvedButton text="share" width="10rem" height="3.5rem" />
            </div>
            <div className="curved-button">
              <CurvedButton
                text="Influence anyone"
                fill="#101010"
                color="white"
                width="14rem"
                height="3.5rem"
              />
            </div>
            <div className="curved-button">
              <CurvedButton text="read" width="10rem" height="3.5rem" />
            </div>
            <div className="curved-button">
              <CurvedButton text="Explore" width="10rem" height="3.5rem" />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div id="steps-card-container" className="w-full max-w-md relative">
            <div className="relative w-full">
              <div className="w-full aspect-[4/3] relative  flex items-center justify-center">
                <StepsCard width="100%" height="100%" />
                <div className="absolute   top-16 left-8 md:left-10 w-[75%] text-black">
                  <span className="text-sm sm:text-lg md:text-xl font-semibold leading-relaxed">
                    Speak your mind <BiBrain className="inline" /> — your unique
                    perspective might be the voice someone's been waiting
                    <br className="sm:hidden" />
                    to hear <BsEar className="inline" />.
                  </span>
                </div>
              </div>
            </div>

            <div id="get-access-btn" className="mt-6 flex justify-center items-center">
              <Link href={"/home"} className="px-6 py-3 mt-10  md:mt-20 z-20 text-white bg-zinc-950 text-base font-semibold rounded-full cursor-pointer shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-300 active:scale-95 flex items-center gap-5">
              Create Your Blog
              <BsArrow90DegUp/>
            </Link>
            </div>
          </div>
        </div>

        {/* Background Circle SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-3xl max-h-3xl">
          <Circle />
        </div>
      </div>

      {/* Stats and Partners Section */}
      <div
        ref={statsRef}
        className="w-full mt-10 lg:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center"
      >
        {/* Partners Card */}
        <PinkContainer/>

        {/* Stats Card */}
        <div
          id="stats-card"
          className="bg-custom-sky-blue rounded-3xl w-full p-6 shadow-lg flex items-center justify-center h-fit"
          style={{ minHeight: "280px" }}
        >
          <div className="flex flex-col items-center text-center py-4">
            <h3 className="text-5xl sm:text-6xl font-extrabold text-black uppercase">
              45M+
            </h3>
            <span className="text-lg mt-2 text-gray-700 tracking-wide">
              Active Readers Monthly
            </span>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Medium connects millions of minds through powerful storytelling.
              Whether you're a seasoned writer or just getting started, it's the
              place to share, discover, and grow.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-800">
              <span>✍️</span>
              <span>Write freely. Read deeply.</span>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div
          ref={testimonialRef}
          id="testimonial-card"
          className="w-full flex justify-center my-16 lg:my-24"
        >
          <div className="relative w-fullmax-w-lg">
            <div className="aspect-[2/1]  w-full relative">
              
              <CurvedRhombus/>
              <div className="absolute inset-0 flex items-center justify-center p-7 px-10 ">
                <div className="w-full max-w-md">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <Image
                      src="/user1.jpg"
                      width={40}
                      height={40}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-zinc-300"
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        Aarav K.
                      </p>
                      <p className="text-xs text-zinc-700">Writer on Medium</p>
                    </div>
                  </div>
                  <p className="text-zinc-800 text-sm md:text-base leading-relaxed italic font-semibold text-center">
                    "Writing on Medium has helped me find my voice, share my
                    story
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thoughts Section */}
      <div
        id="thoughts-section"
        ref={thoughtsRef}
        className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 lg:py-16"
      >
        <div className="flex flex-col lg:col-span-2 justify-center">
          <h3 className="flex items-center justify-center lg:justify-start mb-6">
            <span
              id="brac-left"
              className="text-3xl sm:text-4xl lg:text-6xl font-black font-mono"
            >
              {"{"}
            </span>
            <span
              id="head-text"
              className="text-2xl sm:text-3xl lg:text-4xl mx-2 font-semibold capitalize"
            >
              thoughts
            </span>
            <span
              id="brac-right"
              className="text-3xl sm:text-4xl lg:text-6xl font-black font-mono"
            >
              {"}"}
            </span>
          </h3>
          <p
            id="text-paragraph"
            className="text-black text-xl sm:text-2xl lg:text-4xl leading-tight"
          >
            Blogging is where your voice meets the world — raw, real, and
            unapologetically you. Each post is a spark, lighting up minds and
            building meaningful connections.
          </p>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div
            id="thoughts-image"
            className="rounded-2xl overflow-hidden w-full max-w-sm aspect-square shadow-xl"
          >
            <Image
              src="/thoughts.webp"
              alt="thoughts"
              className="w-full h-full object-cover invert transition-transform hover:scale-105 duration-500"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
