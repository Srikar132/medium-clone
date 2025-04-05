"use client";


import React from 'react'
import Wave from './design/Wave'
import Image from 'next/image'
import { BsArrow90DegUp } from 'react-icons/bs'
import { useGSAP } from '@gsap/react'
import { animateGSAP } from '@/utils'
import Link from 'next/link';

const Testimonials = () => {

  useGSAP(() => {
    animateGSAP("#spring" , {
      opacity : 1,
      x : 0,
      y : 0,
      duration : 1.2,
      ease : "ealstic.inout"
    } , {
      toggleActions : "play none none none"
    });


  } , []);
  return (
    <section
    className='common-padding  relative min-h-[80vh] text-black mt-20 !py-30'
    >
      <div className="absolute w-[75%] h-px bg-black/60 left-1/2 top-0 -translate-x-1/2" />
    
    <div className="container flex flex-col items-center">
        <h1 className="!text-black font-bold text-xl md:text-3xl lg:text-4xl italic uppercase">our users says</h1>

        <p className='text-center max-w-4xl text-black/70 text-md md:text-xl lg:text-3xl mt-10'>This platform gave me the space to express my ideas freely, connect with like-minded readers, and grow both as a writer and a thinker — it's where my voice truly found its home</p>

        <div className="flex gap-5 items-center justify-center md:mt-20 mt-10">
          <Image src={"/user1.jpg"} height={20} width={40} alt='user' className='rounded-full overflow-hidden object-cover md:w-20 md:h-20 h-10 w-10'/>
          <Image src={"/user2.jpg"} height={20} width={40} alt='user' className='rounded-full overflow-hidden object-cover md:w-40 md:h-40 h-20 w-20'/>
          <Image src={"/user3.jpg"} height={20} width={40} alt='user' className='rounded-full overflow-hidden object-cover md:w-20 md:h-20 h-10 w-10'/>
        </div>



        <Link href={"/login"} className="px-6 py-3 mt-10  md:mt-20 z-20 text-white bg-zinc-950 text-base font-semibold rounded-full cursor-pointer shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-300 active:scale-95 flex items-center gap-5">
          Create Your Blog
          <BsArrow90DegUp/>
        </Link>

    </div>


      <div id='spring' className="absolute left-[10%] top-3/5 rotate-45 opacity-0 -translate-x-40 translate-y-60">
        <Image src={"/gsap-spring.png"} width={10} height={10} alt='spring' className='md:w-20 md:h-40 h-20 w-10 animate-pulse '/>
      </div>

      <Wave/>

    </section>
  )
}

export default Testimonials