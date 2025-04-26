'use client'

import React, { useRef, useState, useTransition } from "react";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { sm } from "./ui/__ms__";
import { toast } from "sonner";
import { addComment } from "@/lib/actions";

interface CommentFormProps {
  postId: string;
  userSession: Session | null;
  parentCommentId?: string;
  onCancel?: () => void;
  placeholder?: string;
  buttonText?: string;
}

export default function CommentForm({
  postId,
  userSession,
  parentCommentId,
  onCancel,
  placeholder = "Add a comment...",
  buttonText = "Post"
}: CommentFormProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    if (!userSession) {
      sm({ description: "Please login to continue." });
      return;
    }
    
    startTransition(async () => {
      const formData = new FormData();
      formData.append('postId', postId);
      formData.append('authorId', userSession.id || "");
      formData.append('content', content);
      if (parentCommentId) {
        formData.append('parentCommentId', parentCommentId);
      }
      
      const result = await addComment(formData);
      
      if (result.success) {
        toast.success(result.message);
        setContent("");
        if (onCancel) onCancel();
        if (formRef.current) formRef.current.reset();
      } else {
        toast.error(result.message);
      }
    });
  };
  
  if (!userSession) {
    return (
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
    );
  }
  
  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-md border dark:bg-zinc-900 dark:text-white"
        disabled={isPending}
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          variant="default" 
          disabled={isPending || !content.trim()}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              Posting
            </span>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </form>
  );
}