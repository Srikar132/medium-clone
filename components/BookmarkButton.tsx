"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BsBookmarkFill, BsBookmarkPlus } from 'react-icons/bs';


interface BookmarkButtonProps {
  postId : string;
  initialBookmarked : boolean;
}

const BookmarkButton = ({postId , initialBookmarked} : BookmarkButtonProps) => {
  const {data : session } = useSession();
  const [isBookmarked , setIsBookmarked] = useState<boolean>(initialBookmarked);
  const [isLoading , setIsLoading] = useState <boolean>(false);

  const handleBookmark = async () => {
    if(!session) {
      // show login model

      return ;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/bookmarks' , {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({postId})
      });

      if(response.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error : any) {
      console.log("Error toggling bookmar : " , error?.message);
    }finally {
      setIsLoading(false);
    }
  };



  return (
    <button disabled={isLoading} onClick={handleBookmark} className='rounded-full  w-8 h-8 border-[1px] border-zinc-500  flex items-center justify-center hover:bg-gray-100 text-zinc-500 cursor-pointer'>
      {isLoading ? (
        <div className='w-5 h-5 rounded-full border-1 border-zinc-400 border-t-black animate-spin'/>
      ) :( isBookmarked ? <BsBookmarkFill className='text-sm font-semibold'/> : <BsBookmarkPlus className='text-sm font-semibold'/>) }
    </button>
  )
}

export default BookmarkButton;