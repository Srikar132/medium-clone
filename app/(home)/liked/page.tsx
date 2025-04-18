import React from "react";
import PublishedCard from "@/components/PublishedCard"
import { getALLlikedArticles } from "@/sanity/lib/fetches";


const page = async () => {
  try {
    const likedArticles = await getALLlikedArticles();

    return (
      
        <div className="w-full max-w-7xl mx-auto py-8">
            
            {likedArticles.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">You haven't LIKED any posts yet.</p>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 w-full">
                {likedArticles.map((item: any,i:number) => (
                <PublishedCard 
                key={i} 
                post={item.post}
                variant="liked"
                />
                ))}
            </div>
            )}
        </div>
     
    );
  } catch (error : any) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading drafts. Please try again later. -{error?.message}</p>
        </div>
      </div>
    );
  }
};

export default page;