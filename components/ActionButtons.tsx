"use client"; 
import React from 'react';
import { Trash2, Archive, FileEdit, Send, Undo2 } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomPost } from './article/ArticleCard';

// Define interfaces for props
interface BaseButtonProps {
  postId: string;
  onSuccess?: () => void;
  postTitle?: string;
}

interface MoveToDraftButtonProps extends BaseButtonProps {
  currentStatus: 'published' | 'archived';
}



interface ArticleActionButtonsProps {
  post: CustomPost;
  onSuccess?: () => void;
}

// Delete button with confirmation dialog
export const DeleteButton: React.FC<BaseButtonProps> = ({ postId, onSuccess, postTitle }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const handleDelete = async (): Promise<void> => {
    try {
      setIsDeleting(true);
      await client.delete(postId);
      toast.success('Post deleted successfully');
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center text-xs rounded-md px-2 py-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          title="Delete post"
          aria-label="Delete post"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          <span>Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {postTitle ? `"${postTitle}"` : "this post"}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Archive button with confirmation dialog
export const ArchiveButton: React.FC<BaseButtonProps> = ({ postId, onSuccess, postTitle }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isArchiving, setIsArchiving] = React.useState<boolean>(false);

  const handleArchive = async (): Promise<void> => {
    try {
      setIsArchiving(true);
      await client
        .patch(postId)
        .set({ status: 'archived' })
        .commit();
      toast.success('Post archived successfully');
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error archiving post:', error);
      toast.error('Failed to archive post');
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center text-xs rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          title="Archive post"
          aria-label="Archive post"
        >
          <Archive className="h-3.5 w-3.5 mr-1" />
          <span>Archive</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Archive Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to archive {postTitle ? `"${postTitle}"` : "this post"}? It will be moved to the archive section.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleArchive} disabled={isArchiving}>
            {isArchiving ? "Archiving..." : "Archive"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Move to Draft button with confirmation dialog
export const MoveToDraftButton: React.FC<MoveToDraftButtonProps> = ({ postId, onSuccess, postTitle, currentStatus }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isMoving, setIsMoving] = React.useState<boolean>(false);

  const handleMoveToDraft = async (): Promise<void> => {
    try {
      setIsMoving(true);
      await client
        .patch(postId)
        .set({ status: 'draft' })
        .commit();
      toast.success(`Post moved to drafts successfully`);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error moving post to drafts:', error);
      toast.error('Failed to move post to drafts');
    } finally {
      setIsMoving(false);
    }
  };

  const buttonText = currentStatus === 'archived' ? 'Unarchive' : 'Move to Draft';
  const icon = currentStatus === 'archived' ? <Undo2 className="h-3.5 w-3.5 mr-1" /> : <FileEdit className="h-3.5 w-3.5 mr-1" />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center text-xs rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          title={buttonText}
          aria-label={buttonText}
        >
          {icon}
          <span>{buttonText}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{buttonText}</DialogTitle>
          <DialogDescription>
            {currentStatus === 'archived' 
              ? `Are you sure you want to unarchive ${postTitle ? `"${postTitle}"` : "this post"}? It will be moved to the drafts section.`
              : `Are you sure you want to move ${postTitle ? `"${postTitle}"` : "this post"} to drafts?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMoveToDraft} disabled={isMoving}>
            {isMoving ? "Processing..." : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Publish button with confirmation dialog
export const PublishButton: React.FC<BaseButtonProps> = ({ postId, onSuccess, postTitle }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPublishing, setIsPublishing] = React.useState<boolean>(false);

  const handlePublish = async (): Promise<void> => {
    try {
      setIsPublishing(true);
      await client
        .patch(postId)
        .set({ 
          status: 'published',
          publishedAt: new Date().toISOString()
        })
        .commit();
      toast.success('Post published successfully');
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center text-xs rounded-md px-2 py-1 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 transition-colors"
          title="Publish post"
          aria-label="Publish post"
        >
          <Send className="h-3.5 w-3.5 mr-1" />
          <span>Publish</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to publish {postTitle ? `"${postTitle}"` : "this post"}? It will be visible to all users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing} className="bg-green-600 hover:bg-green-700 text-white">
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Action buttons group component
export const ArticleActionButtons: React.FC<ArticleActionButtonsProps> = ({ post, onSuccess }) => {
  const router = useRouter();

  const handleEdit = (): void => {
    router.push(`/article/edit/${post._id}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleEdit}
        className="flex items-center text-xs rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
        title="Edit post"
        aria-label="Edit post"
      >
        <FileEdit className="h-3.5 w-3.5 mr-1" />
        <span>Edit</span>
      </button>

      {post.status === 'published' && (
        <>
          <MoveToDraftButton 
            postId={post._id} 
            onSuccess={onSuccess} 
            postTitle={post.title} 
            currentStatus="published" 
          />
          <ArchiveButton 
            postId={post._id} 
            onSuccess={onSuccess} 
            postTitle={post.title} 
          />
        </>
      )}

      {post.status === 'draft' && (
        <>
          <PublishButton 
            postId={post._id} 
            onSuccess={onSuccess} 
            postTitle={post.title} 
          />
          <ArchiveButton 
            postId={post._id} 
            onSuccess={onSuccess} 
            postTitle={post.title} 
          />
        </>
      )}

      {post.status === 'archived' && (
        <MoveToDraftButton 
          postId={post._id} 
          onSuccess={onSuccess} 
          postTitle={post.title} 
          currentStatus="archived" 
        />
      )}

      <DeleteButton 
        postId={post._id} 
        onSuccess={onSuccess} 
        postTitle={post.title} 
      />
    </div>
  );
};