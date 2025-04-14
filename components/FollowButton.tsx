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
      <button
        disabled={isLoading}
        onClick={handleFollow}
        className={`relative min-w-32 px-5 py-2 rounded-full flex items-center justify-center 
                    tracking-wid
                    e lowercase transition-all duration-300 ease-in-out 
                    ${isFollowed ? "bg-black text-white" : "bg-white text-black border border-black"} 
                    ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} font-cursive`}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        ) : isFollowed ? (
          "Following"
        ) : (
          <div className="flex items-center gap-2">
            <PiPlus />
            <span>Follow</span>
          </div>
        )}
      </button>
  )
}

export default FollowButton;