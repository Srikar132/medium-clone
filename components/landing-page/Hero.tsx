"use client";


import { useGSAP } from "@gsap/react";
import { animateGSAP } from "@/utils";
import Image from "next/image";
import { BiBrain } from "react-icons/bi";
import { BsArrow90DegUp, BsEar } from "react-icons/bs";
import Link from "next/link";
import Circle from "../design/CircleSvg";
import { CurvedButton, PinkContainer } from "../design/CustomBorderSVG";
import StepsCard from "../design/StepCard";
import GetAccessBtn from "../design/AccessBtn";
import CurvedRhombus from "../design/CurvedRhombus";

function Hero() {

  useGSAP(() => {
    animateGSAP("#head_1" , {
      opacity : 1,
      x : 0,
      y : 0,
      duration : 0.5,
      ease : "ealstic.inout",
      repeat : 0
    } , {});

    animateGSAP("#brac" , {
      opacity : 1,
      x : 0,
      y : 0,
      duration : 1.5,
    } , {});

    animateGSAP("#text_bg" , {
      opacity : 1,
      x : 0,
      y : 0,
      duration : 1.5,
      ease : "power.in"
    } , { toggleActions: "play none none none"});


  } , []);
  return (
    <section
      id="hero"
      className=" lg:px-7.5 pt-5 lg:py-5 px-3 sm:px-5  xl:px-10"
    >
      <div className="w-full grid grid-cols-1  md:grid-cols-2 relative">
        <div className="flex flex-col ">
          <h1 className="max-md:text-center text-4xl  tracking-tighter md:text-6xl  font-black lowercase text-black">
          Share Ideas,<br />Spark Conversations,<br />Inspire the World
          </h1>

          <h1 className="text-sm md:text-xl font-thin mt-5 text-black/60">
            <span className="font-bold uppercase text-xl tracking-wider leading-relax">
              J
            </span>
            oin millions of writers and readers sharing thier stories.
          </h1>

          <div className="flex mt-10 flex-wrap gap-2 ">
            <CurvedButton text="blogging" />
            <CurvedButton text="share" />
            <br />
            <CurvedButton text="Influence anyone" fill="#101010" color="white" width="14rem" />
            <CurvedButton text="read" />
            <CurvedButton text="Explore" />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col gap-10  ">

          {/* section2 */}

          <div className="flex w-full h-full  flex-col items-center">

            <div className="relative h-fit ">
              <StepsCard/>

              <div className="absolute top-16 left-10 w-[70%] text-black">
                <span className="text-xl font-senibold leading-relaxed">Speak your mind  <BiBrain className="inline"/> — your unique perspective might be the voice someone’s <br /> been waiting to <br /> hear
                <BsEar className="inline"/>.
                </span>
              </div>
            </div>

            <Link href={"/login"} className="relative flex items-center  justify-center ">
              <GetAccessBtn/>
              <div className="absolute flex items-center px-5 -top-1 w-full h-full">
                <span className="text-white font-bold uppercase tracking-widest">Get Started</span>
                <BsArrow90DegUp className="ml-[60px] text-white"/>
              </div>
            </Link>
          </div>
        </div>

        <Circle/>
      </div>

      <div className="w-full mt-10 flex items-center md:justify-between flex-wrap max-md:flex-col gap-5">
        <PinkContainer />

        <div className="bg-custom-sky-blue rounded-4xl w-full max-w-md p-5 h-72 shadow-lg">
          <div className="flex flex-col items-center text-center h-full justify-center">
            <h1 className="text-6xl font-extrabold text-black uppercase">45M+</h1>
            <span className="text-lg mt-2 text-gray-700 tracking-wide">Active Readers Monthly</span>
            <p className="mt-4 text-sm text-gray-600 px-2">
              Medium connects millions of minds through powerful storytelling. Whether you're a seasoned writer or just getting started, it's the place to share, discover, and grow.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-800">
              <span>✍️</span>
              <span>Write freely. Read deeply.</span>
            </div>
          </div>
        </div>

        <div id="circle" className="flex  items-center justify-center ">
          <CurvedRhombus/>
          <div className=" w-70 p-5 h-50 absolute ">
            <div className="w-full h-full flex flex-col">
              <div className=" rounded-2xl  duration-300">
                <div className="flex justify-center items-center gap-3 ">
                  <Image src="/user1.jpg" width={10} height={10} alt="User" className="w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-800">Aarav K.</p>
                    <p className="text-xs text-zinc-900 dark:text-zinc-700">Writer on Medium</p>
                  </div>
                </div>
                <p className="text-zinc-800 dark:text-zinc-900 text-sm leading-relaxed italic mb-4 font-semibold mt-3 text-center">
                  “Writing on Medium has helped me find my voice, share my story, and connect with people who truly resonate with my thoughts.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  grid grid-cols-1 md:grid-cols-3 mt-5 p-5">
        <div className="flex col-span-2 flex-col gap-y-5 p-3">
          <h1 className="tracking-wider text-center !text-black w-fit">
            <span id="brac" className="text-xl md:text-2xl lg:text-6xl leading-relaxed font-black font-mono opacity-0 translate-x-5">{"{"}</span>
            <span id="head_1" className="text-xl md:text-2xl lg:text-4xl font-semibold leading-relaxed capitalize opacity-0 overflow-hidden">thoughts</span>
            <span id="brac" className="text-xl md:text-2xl lg:text-6xl leading-relaxed font-black font-mono opacity-0 -translate-x-5">{"}"}</span>
          </h1>
          <p id="text_bg" className="text-black text-md md:text-3xl lg:text-5xl opacity-0 translate-1.5">
            Blogging is where your voice meets the world — raw, real, and unapologetically you.
            Each post is a spark, lighting up minds and building meaningful connections
          </p>
        </div>

        <div className="w-full h-full p-10">
          <div className="rounded-2xl overflow-hidden  w-full h-full  ">
            <img src="/thoughts.webp" alt="thoughts" className="w-full h-full object-cover invert " />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
