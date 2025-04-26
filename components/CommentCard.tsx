import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { CommentWithReplies } from "./Comments";
import CommentReplyForm from "./CommentReplyForm";

interface CommentCardProps {
  comment: CommentWithReplies;
  postId: string;
}

export default function CommentCard({ comment, postId }: CommentCardProps) {
  const { author, content, _createdAt, replies } = comment;
  
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-bold">
                {author.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{author.name || "Anonymous"}</h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(_createdAt), { addSuffix: true })}
            </span>
          </div>

          <div className="mt-1 text-gray-700 dark:text-gray-300">{content}</div>

          <CommentReplyForm commentId={comment._id} postId={postId} />

          {replies && replies.length > 0 && (
            <div className="mt-4 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700 space-y-3">
              {replies.map((reply) => (
                <div key={reply._id} className="pt-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {reply.author.image ? (
                        <Image
                          src={reply.author.image}
                          alt={reply.author.name || "User"}
                          width={28}
                          height={28}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs font-bold">
                            {reply.author.name?.charAt(0) || "?"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">
                          {reply.author.name || "Anonymous"}
                        </h5>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(reply._createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {reply.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}