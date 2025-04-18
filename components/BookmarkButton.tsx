"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { sm } from "./ui/__ms__";
import { toggleBookmark } from "@/lib/actions";
import { toast } from "sonner";

interface BookmarkButtonProps {
  postId: string;
  initialBookmarked: boolean;
}

const BookmarkButton = ({ postId, initialBookmarked }: BookmarkButtonProps) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initialBookmarked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBookmark = async () => {
    if (!session) {
      sm({description : "Please login to bookmark this article page"});      
      return;
    }

    try {
      setIsLoading(true);
      const result = await toggleBookmark(postId , session.id);

      if (result.OK) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error: any) {
      console.log("Error toggling bookmar : ", error?.message);
      toast.error("Error in toggling bookmark. - Try Again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleBookmark}
      className="relative group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isLoading ? (
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
      ) : (
        <div
          className={`transition-all duration-300 ${isBookmarked ? "scale-110" : "scale-100"}`}
        >
          {isBookmarked ? (
            <svg
              className="w-5 h-5 fill-blue-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 fill-gray-400 dark:fill-gray-500 group-hover:fill-blue-400 transition-colors duration-300"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};

export default BookmarkButton;
