"use client";

import React from 'react';
import { ArticleRecommendation } from "@/components/SidebarComponents";
import { CustomPost } from "@/components/article/ArticleCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlFor } from "@/sanity/lib/image";
import { ArticleActionButtons } from '@/components/ActionButtons';
import ErrorCard from '@/components/ErrorCard';

export function ArticleTabs({
  allPosts,
  draftPosts,
  archivedPosts,
  onActionComplete,
}: {
  allPosts: CustomPost[];
  draftPosts: CustomPost[];
  archivedPosts: CustomPost[];
  onActionComplete?: () => void;
}) {
  // Handler for when any action is successful
  const handleActionSuccess = () => {
    if (onActionComplete) onActionComplete();
  };

  // Function to render the empty state message
  const renderEmptyState = (message: string) => (
    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );

  // Function to render post items
  const renderPosts = (posts: CustomPost[]) => (
    <div className="flex flex-col gap-5">
      {posts.map((post: CustomPost , i : number) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
          <div className="flex-grow">
            <ArticleRecommendation
              title={post.title || "Untitled Post"}
              date={post._createdAt}
              href={`/article/${post.slug?.current}`}
              iconSrc={post.mainImage ? urlFor(post.mainImage).url() : ""}
            />
          </div>
          <div className="flex justify-end mt-2 sm:mt-0">
            <ArticleActionButtons post={post} onSuccess={handleActionSuccess} />
          </div>
        </div>
      ))}
    </div>
  );

  // Handle potential error states
  const handleError = (error: any) => {
    return (
      <ErrorCard
        title="Failed to load posts" 
        description="There was an error loading your posts. Please try again later." 
      />
    );
  };

  return (
    <Tabs defaultValue="published" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      
      <TabsContent value="published">
        {allPosts.length === 0 
          ? renderEmptyState("You don't have any published posts yet.")
          : renderPosts(allPosts)
        }
      </TabsContent>
      
      <TabsContent value="drafts">
        {draftPosts.length === 0 
          ? renderEmptyState("You don't have any draft posts yet.")
          : renderPosts(draftPosts)
        }
      </TabsContent>
      
      <TabsContent value="archived">
        {archivedPosts.length === 0 
          ? renderEmptyState("You don't have any archived posts yet.")
          : renderPosts(archivedPosts)
        }
      </TabsContent>
    </Tabs>
  );
}