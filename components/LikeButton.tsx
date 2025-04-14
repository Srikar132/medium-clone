"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({
  postId,
  initialLikeCount,
  initialIsLiked,
}: LikeButtonProps) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLike = async () => {
    if (!session) {
      // show login dailog
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId: session?.id! }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      }
    } catch (error: any) {
      console.log("Error togling like : ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleLike}
      className="relative group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:border-pink-200 dark:hover:border-pink-800"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      {isLoading ? (
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-pink-500 animate-spin" />
      ) : (
        <div
          className={`transition-all duration-300 ${isLiked ? "scale-110" : "scale-100"}`}
        >
          {isLiked ? (
            <svg
              className="w-5 h-5 fill-pink-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 fill-gray-400 dark:fill-gray-500 group-hover:fill-pink-400 transition-colors duration-300"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      )}

      {likeCount > 0 && (
        <div className="absolute -right-1 -top-1 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {likeCount}
          </span>
        </div>
      )}
    </button>
  );
};

export default LikeButton;
