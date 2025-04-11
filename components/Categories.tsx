"use client";

import { blogCategories as trendingSearches } from '@/constants'
import React, { useState } from 'react'
import { RxDoubleArrowDown, RxDoubleArrowUp } from 'react-icons/rx'

const Categories = () => {
  const [expand , setExpand] = useState<boolean>(false);

  return (
    <div className='relative'>
        <div className={`absolute w-full h-[80%] bg-gradient-to-b from-transparent dark:via-transparent pointer-events-none to-white dark:to-[#121212] ${expand ? "hidden" : "block"}`}/>
        <div className={`w-full  mt-5 flex items-center justify-center gap-5 flex-wrap ${expand ? "h-fit" : "h-20"}  overflow-hidden py-3`}>
            {trendingSearches.map((category : string , i) => (
            <span key={i} className="text-[10px] bg-gray-100 rounded-full px-2 py-px text-black cursor-pointer hover:bg-white transition-colors duration-200 border-[0.1px] border-transparent hover:border-gray-300 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-900 dark:hover:border-zinc-900">{category}</span>
            ))}
        </div>
        <div className="w-full flex items-center justify-end">
            <button onClick={() => setExpand((p) => !p)} className="flex items-center gap-2 text-black dark:text-gray-100 cursor-pointer">
                {expand ? <RxDoubleArrowUp className=' leading-0.5 tracking-widest'/> : <RxDoubleArrowDown className=' leading-0.5 tracking-widest'/>}
                <span className='text-sm tracking-wider  leading-0.5'>{expand ? "compress" : "expand"}</span>
            </button>
        </div>
    </div>
  )
}

export default Categories