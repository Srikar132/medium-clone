import { getCommentsForPost } from "@/sanity/lib/fetches";
import ShareButton from "./ShareButton";
import ArticleInfo from "./article/ArticleInfo";
import CommentForm from "./CommentForm";
import { Author, Comment } from "@/sanity/types";
import { Suspense } from "react";
import CommentSkeleton from "./CommentSkeleton";
import { auth } from "@/auth";
import CommentCard from "./CommentCard";

export type CommentWithAuthor = Omit<Comment, "author"> & {
  author: Author;
};

export type CommentWithReplies = CommentWithAuthor & {
  replies: CommentWithAuthor[];
};

async function CommentsList({ id }: { id: string }) {
  // Fetch comments on the server
  const comments = await getCommentsForPost(id);

  if (!comments || comments.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        No comments yet. Be the first to share your thoughts!
      </p>
    );
  }

  return comments.map((comment : CommentWithReplies) => (
    <CommentCard
      key={comment._id} 
      comment={comment} 
      postId={id}
    />
  ));
}

export default async function Comments({ id }: { id: string }) {
  // Get the user session on the server
  const session = await auth();
  
  return (
    <div className="w-full py-3 px-1">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <ShareButton id={id} />
            <ArticleInfo id={id} />
          </div>
        </div>

        <div className="space-y-2">
          <Suspense fallback={
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </>
          }>
            <CommentsList id={id} />
          </Suspense>
        </div>

        <div className="mt-2">
          <CommentForm postId={id} userSession={session} />
        </div>
      </div>
    </div>
  );
}