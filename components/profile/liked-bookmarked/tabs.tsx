"use client";

import React from 'react';
import { ArticleRecommendation } from "@/components/SidebarComponents";
import { CustomPost } from "@/components/article/ArticleCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlFor } from "@/sanity/lib/image";
import ErrorCard from '@/components/ErrorCard';
import LikeButton from '@/components/LikeButton';
import BookmarkButton from '@/components/BookmarkButton';

export function PreferencesTabs({
 likedPosts,
 bookmarkedPosts,
  onActionComplete,
}: {
  likedPosts : CustomPost[];
  bookmarkedPosts : CustomPost[];
  onActionComplete ?: () => void
}) {

  const handleActionSuccess = () => {
    if (onActionComplete) onActionComplete();
  };

  const renderEmptyState = (message: string) => (
    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );

  // Function to render post items
  const renderPosts = (posts: CustomPost[] , varient : string) => (
    <div className="flex flex-col gap-5">
      {posts.map((post: CustomPost , i : number) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
          <div className="flex-grow">
            <ArticleRecommendation
              title={post.title || "Untitled Post"}
              date={post._createdAt}
              href={`/article/${post.slug?.current}`}
              iconSrc={post.mainImage ? urlFor(post.mainImage).url() : "/default-avatar.jpg"} 
            />
          </div>
          <div className="flex justify-end mt-2 sm:mt-0">
            {varient === "liked" && (
                <LikeButton
                    postId={post._id}
                    initialIsLiked={post.isLiked!}
                    initialLikeCount={post.likeCount!}
                />
            ) }

            {varient === "bookmarked" && (
                <BookmarkButton
                    postId={post._id}
                    initialBookmarked={post?.isBookmarked!}
                />
            ) }
          </div>
        </div>
      ))}
    </div>
  );

  const handleError = (error: any) => {
    return (
      <ErrorCard
        title="Failed to load posts" 
        description="There was an error loading your posts. Please try again later." 
      />
    );
  };

  return (
    <Tabs defaultValue="liked" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="liked">Liked</TabsTrigger>
        <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
      </TabsList>
      
      <TabsContent value="liked">
        {likedPosts.length === 0 
          ? renderEmptyState("You don't have any published posts yet.")
          : renderPosts(likedPosts , "liked")
        }
      </TabsContent>

      <TabsContent value="bookmarked">
        {bookmarkedPosts.length === 0 
          ? renderEmptyState("You don't have any published posts yet.")
          : renderPosts(bookmarkedPosts , "bookmarked")
        }
      </TabsContent>
    
    </Tabs>
  );
}