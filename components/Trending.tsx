"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'
import VideoCarousal from './VideoCarousal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

const Trending = () => {

  useGSAP(() => {
    gsap.to("#title" , {
      opacity : 1,
      y : 0,
    });

    gsap.to(".link" , {
      opacity : 1,
      y : 0,
      duration : 1,
      stagger : {
        amount : 0.25,
      }
    })
  } , []);

  return (
    <section id='highlights' className='w-screen relative overflow-hidden h-full common-padding bg-zinc'>

    <div className="absolute w-[75%] h-px bg-black/60 left-1/2 top-0 -translate-x-1/2" />

      <div className="screen-max-width mt-5">

        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id='title' className='section-heading !text-black'>
            #Trending
          </h1>
          <div className="flex gap-5 flex-wrap items-end">
            <a href="#" className='link'>
              <FontAwesomeIcon className='mr-3 text-black' icon={faBook} />
              Explore Blogs
            </a>
            <a href="#" className='link'>
              <FontAwesomeIcon className='mr-3 text-black' icon={faUsers}/>
              Explore Writers
            </a>
          </div>
        </div>

        <VideoCarousal/>
      </div>
    </section>
  )
}

export default Trending