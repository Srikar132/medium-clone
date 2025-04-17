"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import {
  GreenHalfCircle,
  OrangeDiamond,
  PinkFlower,
  PurpleHourglass,
} from "@/constants";
import Image from "next/image";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const sections = gsap.utils.toArray<HTMLElement>(".step");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)" , () => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            `+=${containerRef.current?.scrollWidth || window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (sections.length - 1),
        },
      });


    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useGSAP(() => {

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)" , () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          end: () =>
            `+=${containerRef.current?.scrollWidth || window.innerWidth}`,
          scrub: 0.3,
          once: true,
        },
      });
  
      tl.from("#step1_text-1", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          "#step1_text-2",
          {
            opacity: 0,
            rotateX: -45,
            y: -30,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .from(
          ".step1_img",
          {
            opacity: 0,
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-100, 100),
            scale: 0.7,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
            stagger: 0.3,
          },
          "-=0.8"
        )
        .from("#step2_heading:nth-child(1)", {
          y: -80,
          rotateX: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          "#step2_heading:nth-child(2)",
          {
            y: -50,
            rotateY: 30,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .from(
          "#step2_heading:nth-child(3)",
          {
            y: -40,
            rotateZ: -10,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .set("#step2-cont_text", { text: "" })
        .to("#step2-cont_text", {
          duration: 1.5,
          text: "Blogging turns ideas into impact-",
          ease: "none",
        })
        .from(
          "#step2-cont_text-1, #step2-cont_text-2",
          {
            opacity: 0,
            y: 20,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          "#step2_foot-text",
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            stagger: 0.4,
            ease: "elastic.out(1.2, 0.5)",
          },
          "-=0.6"
        );


    });


  }, []);

  return (
    <section

      id="how-it-works"
      ref={sectionRef}
      className="relative w-full  mt-24 overflow-hidden"
    >
      <div className="absolute w-[75%] h-px bg-black/60 left-1/2 -translate-x-1/2" />
      <div ref={containerRef} className="flex w-screen flex-col lg:flex-row lg:w-[300vw] h-screen">
        {/* Step 1 */}
        <div className="step w-screen h-full flex text-white relative">
          <div className="grid lg:grid-cols-2 w-full px-12 py-10 h-full items-center">
            <div className="w gap-10 space-y-20 lg:space-y-40">
              <div className="flex flex-col gap-2">
                <span
                  id="step1_text-1"
                  className="relative rounded-lg bg-custom-purple w-fit md:text-3xl lg:text-6xl font-bold capitalize px-3 py-2 text-black"
                >
                  Explore World
                </span>
                <span
                  id="step1_text-2"
                  className="rounded-lg bg-custom-orange w-fit text-xl  lg:text-5xl font-bold translate-x-10 capitalize px-3 py-2 text-black"
                >
                  Share your thoughts
                </span>
              </div>

              <span className="lg:text-4xl text-black/100 font-sans tracking-wider">
                In today's fast-paced world, where information is key, blogging
                remains a timeless medium for storytelling, learning, and
                making an impact.
              </span>
            </div>

            <div className="lg:relative absolute max-lg:w-full max-lg:">
              <div className="step1_img max-lg:animate-pulse scale-50 absolute -top-14  lg:top-0 lg:left-10">
                <PinkFlower width={100} height={100} />
              </div>
              <div className="step1_img hidden lg:block absolute right-1/2 -top-40">
                <Image
                  src="/gssap-tube.png"
                  className="w-52 h-52"
                  alt="GSAP Tube"
                  height={50}
                  width={50}
                />
              </div>
              <div className="step1_img hidden lg:block absolute top-full left-1/2 -translate-x-1/2">
                <GreenHalfCircle width={400} height={400} />
              </div>
              <div className="step1_img scale-50 top-0 right-[10%] max-lg:animate-ping max-lg:opacity-45  absolute lg:-top-10 lg:right-1/3">
                <PurpleHourglass width={50} height={70} />
              </div>
              <div className="step1_img absolute -top-80 left-1/4">
                <OrangeDiamond width={50} height={50} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="max-lg:px-5  step w-screen h-full flex items-center text-white relative">
        <div className="absolute w-[75%] h-px bg-black/60 left-1/2 -translate-x-1/2 top-0 lg:hidden" />
          <div className="inline-flex  max-lg:flex-wrap gap-1 lg:gap-10 lg:items-center">
            <span
              id="step2_heading"
              className="lg:px-4  inline-block lg:py-2 lg:bg-custom-pink lg:text-8xl lg:rounded-2xl lg:tracking-widest lg:uppercase font-semibold  text-black"
            >
              blog
            </span>
            <span
              id="step2_heading"
              className="lg:px-4 lg:py-2 lg:bg-custom-sky-blue lg:text-sm lg:uppercase font-semibold text-black lg:rotate-12"
            >
              your
            </span>
            <span
              id="step2_heading"
              className="lg:px-4 lg:py-2 lg:bg-custom-purple lg:text-3xl lg:uppercase   lg:font-semibold text-black"
            >
              adventures
            </span>
            <div className="inline lg:flex gap-4 items-center text-black">
              <span
                id="step2-cont_text"
                className=" font-semibold lg:text-6xl  capitalize lg:whitespace-nowrap "
              ></span>
              <span
                id="step2-cont_text"
                className="lg:hidden"
              >Blogging turns ideas into impact-</span>
              <span
                id="step2-cont_text-1"
                className="font-semibold lg:text-6xl text-lg lowercase"
              >
                inspire-
              </span>
              <span
                id="step2-cont_text-2"
                className="font-semibold lg:text-6xl text-lg lowercase"
              >
                educates 
              </span>
              {" "}
              <span
                id="step2_foot-text"
                className="lg:px-4 lg:py-2 lg:bg-gradient-to-tr from-custom-orange rounded-xl via-custom-orange  to-white lg:text-6xl lg:uppercase lg:font-semibold text-black lg:opacity-0 lg:translate-y-10"
              >
                influences
              </span>
              {"  "}
              <span
                id="step2_foot-text"
                className="lg:px-4 lg:py-2 lg:bg-gradient-to-l from-custom-baby-pink via-custom-baby-pink to-white text-sm lg:uppercase lg:font-semibold lg:-rotate-45  lg:-translate-x-1/2 text-black lg:opacity-0 lg:translate-y-10"
              >
                the
              </span>
              {"  "}
              <span
                id="step2_foot-text"
                className="lg:px-4 lg:py-2 lg:bg-gradient-to-br from-custom-purple via-custom-purple to-black/10 lg:shadow-black lg:scale-3d  lg:text-7xl lg:opacity-0 lg:-translate-x-1/6 translate-y-10 lg:uppercase lg:font-semibold text-black"
              >
                World
              </span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step  w-screen h-full flex items-center justify-center e">
          
        </div>
      </div>
    </section>
  );
}
