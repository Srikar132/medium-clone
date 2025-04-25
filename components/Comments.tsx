"use client";

import { createComment, getCommentsForPost } from "@/sanity/lib/fetches";
import React, { useEffect, useState } from "react";
import ShareButton from "./ShareButton";
import ArticleInfo from "./article/ArticleInfo";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/useFetch";
import { sm } from "./ui/__ms__";
import { Author, Comment } from "@/sanity/types";

export type CommentWithAuthor = Omit<Comment, "author"> & {
  author: Author;
};

export type CommentWithReplies = CommentWithAuthor & {
  replies: CommentWithAuthor[];
};

const Comments = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState<string>("");
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);

  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const {
    data: fetchedComments,
    isLoading,
    refresh,
  } = useFetch<CommentWithReplies[]>(() => getCommentsForPost(id), []);

  useEffect(() => {
    refresh();
  }, [id , refresh]);

  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!session) {
      // show login form
      return;
    }

    setIsSendingComment(true);

    await createComment({
      postId: id,
      authorId: session.id,
      content: newComment,
    });

    const tempComment: CommentWithReplies = {
      _id: Date.now().toString(), // Temporary ID
      _type: "comment",
      content: newComment,
      author: {
        _id: session.id,
        name: session.user?.name || "Anonymous",
        image: session.user?.image || "",
        _type: "author",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: "",
      },
      replies: [],
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      _rev: "",
      post: {
        _type: "reference",
        _ref: id,
      },
    };

    // Add the new comment to the local state
    setComments((prevComments) => [tempComment, ...prevComments]);

    toast("comment added successfully");
    setIsSendingComment(false);
    setNewComment("");
  };

  const onReply = async (
    commentId: string,
    replyContent: string
  ): Promise<CommentWithAuthor | null> => {
    if (!session) {
      sm({ description: "Please login to reply to comments" });
      return null;
    }

    try {
      await createComment({
        postId: id,
        authorId: session.id,
        content: replyContent,
        parentCommentId: commentId,
      });

      const tempReply: CommentWithAuthor = {
        _id: Date.now().toString(),
        _type: "comment",
        content: replyContent,
        author: {
          _id: session.id,
          name: session.user?.name || "Anonymous",
          image: session.user?.image || "",
          _type: "author",
          _createdAt: new Date().toISOString(),
          _updatedAt: new Date().toISOString(),
          _rev: "",
        },
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        _rev: "",
        post: {
          _ref: id,
          _type: "reference",
        },
      };

      toast("Reply added successfully");

      return tempReply;
    } catch (error) {
      toast("Failed to add reply. Please try again.");
      console.error("Error adding reply:", error);
      return null;
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll py-3 px-1">
      <div className="w-full h-full flex flex-col space-y-4">
        <div className="w-full justify-between flex items-center ">
          <div className="flex items-center gap-1">
            <ShareButton id={id} />
            <ArticleInfo id={id} />
          </div>
        </div>

        <div className="space-y-2 overflow-y-scroll">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)
          ) : (comments as Array<CommentWithReplies>).length > 0 ? (
            comments?.map((comment, i) => (
              <CommentCard key={i} onReply={onReply} comment={comment} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>

        <div className="mt-2">
          {!!session ? (
            <form
              className="flex items-center gap-2"
              onSubmit={handleAddComment}
            >
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 rounded-md border dark:bg-zinc-900 dark:text-white"
              />
              {isSendingComment ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              ) : (
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={isSendingComment}
                >
                  post
                </Button>
              )}
            </form>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please{" "}
              <button
                onClick={() => sm({ description: "Please Login to continue." })}
                className="underline text-blue-500"
              >
                login
              </button>{" "}
              to comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
