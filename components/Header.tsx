"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {enablePageScroll , disablePageScroll} from "@fluejs/noscroll"
import {navigation} from "@/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

function Header() {

    const [openNavigation, setOpenNavigation] = useState<boolean>(false);


    const handleClick = () => {
        if(!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    }

    const toggleNavigation = () => {
        if(openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        }else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    }

  return (
    <header className='w-full z-50'>
        <div className="nav_cont">
            <Link className='gap-5 w-[12rem] items-center flex ' href={"/"}>
                <Image className='max-md:w-10 max-md:h-10 ' src={"/logo.jpg"} height={50} width={50} alt='LOGO'/>
            </Link>

            <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-0 left-0 right-0 
            bottom-0 bg-black  z-50 flex-col items-center justify-center lg:static lg:flex lg:flex-row lg:ml-auto lg:bg-transparent`}>
                {navigation.map((item , index) => (
                    <a key={index}  href={item.href}
                        className={`block text-white/80 relative lg:text-black font-code uppercase  text-md lg:text-2xl  text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile?'lg:hidden':""} px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold $lg:leading-5 lg:hover:text-n-1`}
                        onClick={handleClick}
                    >
                    {item.name}
                    </a> 
                ))}
                <button onClick={() => {
                    if(!openNavigation) return;
                    setOpenNavigation(false);
                    enablePageScroll();
                }} className='absolute lg:hidden top-2 right-2'>
                    <FontAwesomeIcon icon={faClose} className='text-2xl cursor-pointer'/>
                </button>
            </nav>

            <div className="bg-gradient-to-r hidden lg:block from-custom-baby-pink via-custom-pink  to-custom-sky-blue ml-10 max-lg:ml-auto pt-1 rounded-full">
                <Link href={"/login"} className='rounded-full px-5 py-3 text-lg capitalize tracking-wider cursor-pointer bg-[#282A38]'>
                    signup
                </Link>
            </div>
            
            <button
                className='ml-auto px-3 cursor-pointer lg:hidden' 
                
                onClick={toggleNavigation}>
                <FontAwesomeIcon icon={faBars} className='text-xl text-black'/>
            </button>
        </div>
    </header>
  )
}

export default Header