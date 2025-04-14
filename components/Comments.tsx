"use client";

import { createComment, getCommentsForPost } from "@/sanity/lib/fetches";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton";
import ArticleInfo from "./article/ArticleInfo";
import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Comments = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentProps["comment"][]>([]);
  const [newComment, setNewComment] = useState("");
  const session = useSession();

  if(!session.data?.id) {
    throw new Error("Unauthorized user");
  }
  const getComments = async () => {
    setIsLoading(true);
    const fetchedComments : CommentProps["comment"][] = await getCommentsForPost(id);
    setComments(fetchedComments || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSendingComment(true);
   
    const newCom = await createComment({
      postId : id,
      authorId : session.data?.id,
      content : newComment
    });

    await getComments();

    toast("comment added successfully");
    setIsSendingComment(false);;
    setNewComment("");
  };

  const onReply = async (commentId : string, replyContent : string) => {
      const comm = await createComment({
        postId : id ,
        authorId : session.data?.id,
        content : replyContent,
        parentCommentId : commentId
      });
      
      await getComments();
  }

  return (
    <div className="w-full h-full overflow-y-scroll py-3 px-1">
      <div className="w-full h-full flex flex-col space-y-4">
      
        <div className="w-full max-lg:justify-end flex gap-x-3">
          <ShareButton id={id}/>
          <ArticleInfo />
        </div>

        
        <div className="mt-2">
          {session.data.id ? (
            <form className="flex items-center gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 rounded-md border dark:bg-zinc-900 dark:text-white"
              />
              {isSendingComment ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              ) : <Button
                type="submit"
                variant={"default"}
                disabled={isSendingComment}
                onClick={() => handleAddComment()}
              >
                post
              </Button>}
            </form>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please <button className="underline text-blue-500">login</button> to comment.
            </p>
          )}
        </div>

        {/* Comments */}
        <div className="space-y-2 overflow-y-scroll">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
            : comments.length > 0
            ? comments.map((comment, i) => (
                <CommentCard key={comment._id || i} onReply={onReply} comment={comment} />
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
