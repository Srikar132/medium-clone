import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";

function Footer() {
  const quotes = [
    "Ideas are the currency of the 21st century.",
    "Write to express, not to impress.",
    "Great stories happen to those who can tell them.",
    "Words can change minds, and minds can change worlds.",
    "Every writer was once a reader first."
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className='w-full z-20  flex flex-col justify-center items-center bg-[#101010] pt-32'>
      <div className='mb-10 md:mb-16 w-[90%] h-1/3 rounded-3xl  bg-gradient-to-r from-zinc-700 to-zinc-800'>
        <div className='flex flex-col md:flex-row items-center justify-between p-6'>
          <div className='w-full md:w-2/5 lg:w-5/12 mb-6 md:mb-0'>
            <p className='text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-semibold leading-snug'>
              Keep Up-To-Date With Thoughtful Reads
            </p>
          </div>
          <div className='w-full md:w-3/5 lg:w-6/12'>
            <div className='border border-[#81858b] rounded-md flex flex-col justify-between sm:flex-row items-center p-2'>
              <p className='text-gray-200 text-lg sm:text-xl lg:text-2xl text-center sm:text-left mb-3 sm:mb-0 sm:mr-4'>
                Get the latest <span className='italic'>"Stories"</span> in your inbox
              </p>
              <button className='w-full sm:w-auto text-lg bg-gradient-to-r from-[#fda4af] to-[#f472b6] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[90%] max-w-2xl text-center mb-10'>
        <p className='bg-gradient-to-r from-[#fda4af] to-[#f472b6] bg-clip-text text-transparent italic text-lg md:text-xl'>"{randomQuote}"</p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-between w-[90%] max-w-4xl mb-12 gap-6'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-start'>
          <a href='#' className='text-white text-base sm:text-lg hover:underline hover:text-[#fda4af]'>About us</a>
          <a href='#' className='text-white text-base sm:text-lg hover:underline hover:text-[#fda4af]'>Contact us</a>
          <a href='#' className='text-white text-base sm:text-lg hover:underline hover:text-[#fda4af]'>Privacy Policy</a>
          <a href='#' className='text-white text-base sm:text-lg hover:underline hover:text-[#fda4af]'>Terms</a>
        </div>
        <div className='flex gap-5 md:gap-6 mt-4 sm:mt-0'>
          <FaInstagram className='text-2xl md:text-3xl text-gray-300 hover:text-[#fda4af] cursor-pointer'/>
          <FaTwitter className='text-2xl md:text-3xl text-gray-300 hover:text-[#fda4af] cursor-pointer'/>
          <IoLogoGithub className='text-2xl md:text-3xl text-gray-300 hover:text-[#fda4af] cursor-pointer'/>
          <BsLinkedin className='text-2xl md:text-3xl text-gray-300 hover:text-[#fda4af] cursor-pointer'/>
          <FaFacebook className='text-2xl md:text-3xl text-gray-300 hover:text-[#fda4af] cursor-pointer'/>
        </div>
      </div>

      <div className='text-center px-4'>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Thoughtful Reads. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;