"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';


interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({
  postId,
  initialLikeCount,
  initialIsLiked
} : LikeButtonProps) => {
  

  const {data : session} = useSession();
  const [isLiked , setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount , setLikeCount] = useState<number>(initialLikeCount);
  const [isLoading , setIsLoading] = useState <boolean>(false);

  const handleLike = async () => {
    if(!session) {
      // show login dailog
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/likes' , {
        method : "POST",
        headers : {
          'Content-Type' : "application/json",
        },
        body : JSON.stringify({postId , userId : session?.id!})
      });

      if(response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1 );
      }
    } catch (error : any) {
      console.log("Error togling like : " , error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
        <button disabled={isLoading} onClick={handleLike} className='rounded-full relative  w-8 h-8 border-[1px] border-zinc-500  flex items-center justify-center hover:bg-gray-100 text-zinc-500 cursor-pointer'>
        {isLoading ? (
          <div className='w-5 h-5 rounded-full border-1 border-zinc-400 border-t-black animate-spin'/>
        ) :( isLiked ? <FcLike className='text-sm text-pink-500 font-semibold'/> : <FcLikePlaceholder className='text-sm font-semibold'/>) }

        {likeCount > 0 && <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full flex items-center justify-center bg-white p-px border">
          <span className='text-xs'>{likeCount}</span>
        </div>}
      </button>
  )
}

export default LikeButton