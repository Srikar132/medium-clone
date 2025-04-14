import React from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export interface CommentProps {
  comment: {
    _id: string;
    content: string;
    publishedAt: string;
    parentComment?: string | null;
    author: {
      name: string;
      image : string
    };
  };
}

const CommentCard = ({ comment }: { comment: CommentProps["comment"] }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4 flex gap-4 border border-gray-200 dark:border-zinc-800 mb-4">
      
      <div>
        <Image
          src={comment.author?.image || "/default-avatar.png"}
          alt={comment.author.name}
          className="w-12 h-12 rounded-full object-cover border"
          width={5}
          height={5}
          
        />
      </div>

     
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {comment.author.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(comment.publishedAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>

        {comment.parentComment && (
          <div className="text-sm text-blue-500 mt-2">
            Replying to a comment
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
