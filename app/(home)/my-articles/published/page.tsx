import { auth } from "@/auth";
import DraftCard from "@/components/DraftCard";
import { getALLArticlesByAuthorId, getDraftsByAuthor } from "@/sanity/lib/fetches";
import React from "react";
import PublishedCard from '@/components/PublishedCard'

const page = async () => {
  try {
    const session = await auth();
    const posts = await getALLArticlesByAuthorId(session?.id as string);

    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        
        {posts.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You don't have any PUBLISHED posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post : any) => (
              <PublishedCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading drafts. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default page;