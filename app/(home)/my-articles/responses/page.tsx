"use client";

import { ChevronRight, X } from "lucide-react";
import Comments from "@/components/Comments";
import { Skeleton } from "@/components/WritePageSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getAllArticlesByAuthorId } from "@/sanity/lib/fetches";
import { Post } from "@/sanity/types";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ArticlesPage = () => {
  const { data: session, status } = useSession();
  const { data: posts = [], isLoading, error } = useFetch<Post[]>(
    () => getAllArticlesByAuthorId(session?.id!),
    [session?.id]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleArticleSelect = (id: string) => {
    setSelectedId(id);
    if (isMobile) {
      setShowComments(true);
    }
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  return (
    <div className="w-full p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Articles</h1>
      
      {isMobile && (
        <div className="md:hidden">
          {showComments && selectedId ? (
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                <button 
                  onClick={handleCloseComments}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <Comments id={selectedId} />
            </div>
          ) : null}
          
          <div className="space-y-4">
            {isLoading ? (
              <ArticleColumnSkeleton />
            ) : posts.length === 0 ? (
              <EmptyState />
            ) : (
              posts.map((post: Post) => (
                <ArticleCard 
                  key={post._id}
                  post={post}
                  isSelected={selectedId === post._id}
                  onClick={() => handleArticleSelect(post._id)}
                />
              ))
            )}
          </div>
        </div>
      )}
      
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 ">
        <div className="space-y-4 col-span-1">
          {isLoading ? (
            <ArticleColumnSkeleton />
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((post: Post) => (
              <ArticleCard 
                key={post._id}
                post={post}
                isSelected={selectedId === post._id}
                onClick={() => handleArticleSelect(post._id)}
              />
            ))
          )}
        </div>

        <div className="col-span-2 overflow-y-scroll">
          <div className="bg-white rounded-xl shadow-md p-2  sm:p-4 md:p-6 h-full ">
            {selectedId ? (
              <Comments id={selectedId} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <span>Select an article to view comments</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleCard = ({ post, isSelected, onClick } : {
  post : Post;
  isSelected : boolean;
  onClick : () => void
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 flex items-center justify-between ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-transparent"
      }`}
    >
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 line-clamp-2">{post.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(post._createdAt).toLocaleDateString()}
        </p>
      </div>
      <ChevronRight 
        size={20} 
        className={`text-gray-400 ${isSelected ? "text-blue-500" : ""}`} 
      />
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-dashed border-gray-300 h-full">
    <p className="text-gray-600 mb-2">You don't have any published posts yet.</p>
    <p className="text-sm text-gray-500">Create your first article to see comments.</p>
  </div>
);

const ArticleColumnSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="w-full h-24 relative">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    ))}
  </div>
);

export default ArticlesPage;