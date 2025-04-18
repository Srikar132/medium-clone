import { auth } from "@/auth";
import DraftCard from "@/components/DraftCard";
import { getDraftsByAuthor } from "@/sanity/lib/fetches";
import React from "react";


const page = async () => {
  try {
    const session = await auth();
    const posts: DraftPost[] = await getDraftsByAuthor(session?.id as string);

    return (
      <div className="w-full py-8">
        
        {posts.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You don't have any draft posts yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <DraftCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full  py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading drafts. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default page;