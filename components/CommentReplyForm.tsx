'use client'

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";

interface CommentReplyFormProps {
  commentId: string;
  postId: string;
}

export default function CommentReplyForm({ commentId, postId }: CommentReplyFormProps) {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);

  if (!session) {
    return null;
  }

  return (
    <div className="mt-2">
      {!isReplying ? (
        <button 
          onClick={() => setIsReplying(true)}
          className="text-xs text-blue-500 hover:underline"
        >
          Reply
        </button>
      ) : (
        <div className="mt-2">
          <CommentForm
            postId={postId}
            userSession={session}
            parentCommentId={commentId}
            onCancel={() => setIsReplying(false)}
            placeholder="Write a reply..."
            buttonText="Reply"
          />
        </div>
      )}
    </div>
  );
}