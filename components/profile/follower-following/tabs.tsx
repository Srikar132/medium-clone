"use client";

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorCard from '@/components/ErrorCard';
import { Author } from '@/sanity/types';
import AuthorCard from '@/components/AuthorCard';
import FollowButton from '@/components/FollowButton';

export type CustomAuthor = Author & {
    isMeFollowing : boolean
}

export function FollowTabs({
 myFollowers,
following,
  onActionComplete,
}: {
  myFollowers : CustomAuthor[];
  following : CustomAuthor[];
  onActionComplete ?: () => void
}) {


  const renderEmptyState = (message: string) => (
    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );

  // Function to render post items
  const renderAuthors = (authors: CustomAuthor[]) => (
    <div className="flex flex-col gap-5">
      {authors.map((author: CustomAuthor , i : number) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white dark:bg-card rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all flex-wrap" >
          <div className="flex-grow">
            <AuthorCard
                author={author}
                isMeFollowing={author?.isMeFollowing}
            />
          </div>
        </div>
      ))}
    </div>
  );


  return (
    <Tabs defaultValue="Followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Followers">Followers</TabsTrigger>
        <TabsTrigger value="Following">Following</TabsTrigger>
      </TabsList>
      
      <TabsContent value="Followers">
        {myFollowers.length === 0 
          ? renderEmptyState("You don't have any followers yet.")
          : renderAuthors(myFollowers)
        }
      </TabsContent>

      <TabsContent value="Following">
        {following.length === 0 
          ? renderEmptyState("You don't have any followings yet.")
          : renderAuthors(following)
        }
      </TabsContent>
    
    </Tabs>
  );
}