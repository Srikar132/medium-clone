"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { sm } from './ui/__ms__';
import { toggleFollow } from '@/lib/actions';
import { toast } from 'sonner';
import TooltipWrapper from './TooltipWrapper';


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
      sm({
        description : "Please login to follow our authors",
      })
      return;
    }

    try {
      setIsLoading(true);
      const result = await toggleFollow(session.id , authorId);

      if(result.OK) {
        setIsFollowed(!isFollowed);
        toast(!isFollowed ? "Followed the author successfully - liked page will update later!." : "Unfollowed the author successfully - Liked page will update later!.")
      }
    } catch (error : any) {
      console.log("Error togling like : " , error.message);
      toast.error("Error in toggling follow. - Try Again!");
    }finally{
      setIsLoading(false);
    }
  }

  return authorId === session?.id ? null :  (
      <button
        disabled={isLoading}
        onClick={handleFollow}
        className={`relative s px-2 sm:px-3 py-1 rounded-xl flex items-center justify-center text-sm
                     lowercase transition-all duration-300 ease-in-out 
                    ${isFollowed ? "bg-black text-white" : "bg-white text-black border border-black"} 
                    ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} font-cursive`}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-3 border-pink-400 border-t-black rounded-full animate-spin" />
        ) : isFollowed ? (
          "UnFollow"
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