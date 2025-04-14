"use client";

import { getCommentsForPost } from "@/sanity/lib/fetches";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton";
import ArticleInfo from "./article/ArticleInfo";
import CommentCard, { CommentProps } from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import { useSession } from "next-auth/react";

const Comments = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentProps["comment"][]>([]);
  const [newComment, setNewComment] = useState("");
  const session = useSession();

  if(!session.data?.id) {
    throw new Error("Unauthorized user");
  }

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      const fetchedComments = await getCommentsForPost(id);
      setComments(fetchedComments || []);
      setIsLoading(false);
    };

    getComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    // TODO: Replace with actual API call to add comment
    const dummyComment = {
      _id: Math.random().toString(),
      content: newComment,
      publishedAt: new Date().toISOString(),
      author: {
        name: "You",
       image : ""
      },
    };

    setComments([dummyComment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="w-full h-full overflow-y-scroll py-3 px-1">
      <div className="w-full h-full flex flex-col space-y-4">
        {/* Header: Share & Info */}
        <div className="w-full flex gap-x-3">
          <ShareButton />
          <ArticleInfo />
        </div>

        {/* New Comment Box */}
        <div className="mt-2">
          {session.data.id ? (
            <div className="flex items-center gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 rounded-md border dark:bg-zinc-900 dark:text-white"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please <button className="underline text-blue-500">login</button> to comment.
            </p>
          )}
        </div>

        {/* Comments */}
        <div className="space-y-2">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
            : comments.length > 0
            ? comments.map((comment, i) => (
                <CommentCard key={comment._id || i} comment={comment} />
              ))
            : (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
