import React from "react";
import PublishedCard from "@/components/PublishedCard"
import { getALLlikedArticles } from "@/sanity/lib/fetches";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";


async function unlikePost(postId: string):Promise<void> {
  "use server";

  try {
    const session = await auth();
    const userId = session?.id;

    const likeQuery =` *[_type == "like" && post._ref == $postId && author._ref == $userId][0]._id`;
    const likeId = await client.fetch(likeQuery,{postId,userId});

    if(likeId) {
      await writeClient.delete(likeId);
    } else {

    }
  } catch (error) {
    console.error("Error Unlikng post: ",error);
  }
}

const page = async () => {
  try {
    const likedArticles = await getALLlikedArticles();

    return (
        <div className="w-full h-screen p-5 lg:p-10">
        <div className="w-full mx-auto max-w-3xl flex items-center justify-between p-2 sm:p-5 md:p-6 lg:p-7">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cursive ">Liked articles</h1>

        </div>

        <div className="w-full max-w-7xl mx-auto py-8">
            
            {likedArticles.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">You haven't LIKED any posts yet.</p>
            </div>
            ) : (
            <div className="grid grid-cols-4 md:grid-cols-4 gap-5">
                {likedArticles.map((item: any,i:number) => (
                <PublishedCard 
                key={i} 
                post={item.post}
                variant="liked"
                onUnlike={unlikePost} 
                />
                ))}
            </div>
            )}
        </div>
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