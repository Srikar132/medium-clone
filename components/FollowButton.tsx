"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { PiPlus } from 'react-icons/pi';


interface FollowButtonProps {
  authorId: string;
  initialIsFollowed : boolean;
}

const FollowButton = ({
  authorId,
  initialIsFollowed
} : FollowButtonProps) => {
  const {data : session} = useSession();
  const [isFollowed , setIsFollowed] = useState<boolean>(initialIsFollowed);
  const [isLoading , setIsLoading] = useState <boolean>(false);

  const handleFollow = async () => {
    if(!session) {
      // show login dailog
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/follow' , {
        method : "POST",
        headers : {
          'Content-Type' : "application/json",
        },
        body : JSON.stringify({authorId , userId : session?.id})
      });

      if(response.ok) {
        setIsFollowed(!isFollowed);
      }
    } catch (error : any) {
      console.log("Error togling like : " , error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return authorId === session?.id ? null :  (
        <button disabled={isLoading} onClick={handleFollow}className={`rounded-full relative min-w-30 ${isFollowed ?  "bg-black text-white" : "bg-white text-black border border-black"} px-4 py-1   flex items-center justify-center tracking-wider leading-relaxed
        lowercase cursor-pointer !font-cursive`}>
        {isLoading ? (
          <div className='w-7 h-7 rounded-full border-2 border-zinc-400 border-t-black animate-spin'/>
        ) :( isFollowed ? "Following" : (
          <>
            <PiPlus/>
            <span>Follow</span>
          </>
        )) }

      </button>
  )
}

export default FollowButton;