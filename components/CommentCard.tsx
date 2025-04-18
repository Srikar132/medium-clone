import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommentWithAuthor, CommentWithReplies } from "./Comments";





interface ReplyCommentProps {
  reply: CommentWithAuthor
}

interface CommentCardProps {
  comment: CommentWithReplies
  onReply?: (commentId: string, content: string) => Promise<CommentWithAuthor | null>;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ reply }) => {
  return (
    <div className="border-t border-gray-200 dark:border-zinc-800 py-4 flex gap-3">
      <Link href={`/profile/${reply?.author._id}`}>
        <Image
          src={reply.author?.image || "/default-avatar.jpg"}
          alt={"author"}
          className="w-6 h-6 rounded-full object-cover border"
          width={24}
          height={24}
        />
      </Link>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
            {reply.author.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {reply.publishedAt! && formatDistanceToNow(new Date(reply.publishedAt!), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-200">{reply.content}</p>
      </div>
    </div>
  );
};

const CommentCard: React.FC<CommentCardProps> = ({ comment, onReply }) => {
  const [replyContent, setReplyContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [replies, setReplies] = useState<CommentWithAuthor[]>(comment.replies);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim() && onReply) {
      setIsSubmitting(true);
      try {
        const tempReply : CommentWithAuthor | null = await onReply(comment._id, replyContent);
        setReplyContent("");

        if(tempReply )setReplies((prev) => [...prev , tempReply])
        
      } catch (error) {
        console.error("Failed to post reply:", error);
        
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const replyCount = replies?.length || 0;

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4 flex gap-4 border border-gray-200 dark:border-zinc-800 mb-4">
      <Link href={`/profile/${comment?.author._id}`}>
        <Image
          src={comment.author?.image || "/default-avatar.jpg"}
          alt={comment.author.name || "Author"}
          className="w-8 h-8 rounded-full object-cover border"
          width={32}
          height={32}
        />
      </Link>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {comment.author.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(comment.publishedAt!), {
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

        <div className="mt-3 flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                {replyCount > 0 ? `${replyCount} ${replyCount === 1 ? 'Reply' : 'Replies'}` : 'Reply'}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Replies</DialogTitle>
              </DialogHeader>
              <div className="max-h-80 overflow-y-auto">
                {/* Original comment */}
                <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4">
                  <div className="flex gap-3 mb-2">
                    <Image
                      src={comment.author?.image || "/default-avatar.jpg"}
                      alt={comment.author.name || "Author"}
                      className="w-8 h-8 rounded-full object-cover border"
                      width={32}
                      height={32}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {comment.author.name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(comment.publishedAt!), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                </div>
                
                {/* Replies section */}
                {replies?.length > 0 ? (
                  replies.map((reply) => (
                    <ReplyComment key={reply._id} reply={reply} />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No replies yet</p>
                )}
              </div>
              
              {/* Reply form */}
              <form onSubmit={handleSubmitReply} className="mt-4 border-t border-gray-200 dark:border-zinc-800 pt-4">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
                  rows={3}
                />
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button 
                    type="submit" 
                    disabled={!replyContent.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Reply'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;