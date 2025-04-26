import ArticleContent from "@/components/article/ArticleContent";
import { notFound } from "next/navigation";
import { SanityError } from "@/types/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const experimental_ppr = true;

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const slug =(await  params)?.slug;
    
    if (!slug) {
      return notFound();
    }
    

    return (
      <div className="w-full min-h-screen mt-20">
        <Suspense fallback={<BlogPostSkeleton/>}>
          <ArticleContent slug={slug}/>
        </Suspense>
      </div>
    );
  } catch (error) {
    if (error instanceof SanityError && error.status === 404) {
      notFound();
    }
    
    throw error;
  }
};

export default ArticlePage;

const BlogPostSkeleton = () => {
  return (
    <div className="w-full min-h-screen  text-gray-100 p-4 md:p-6">
      <div>
        <div className="mb-6">
          <Skeleton className="h-10 w-4/5 bg-gray-800 rounded-md mb-4" />
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
            <Skeleton className="h-5 w-40 bg-gray-800 rounded-md" />
            <div className="ml-auto flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
              <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
            </div>
          </div>
        </div>

        <Skeleton className="w-full h-64 md:h-80 rounded-lg bg-gray-800 mb-6" />

        <div className="mb-8">
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-5/6 bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-4/5 bg-gray-800 rounded-md mb-4" />
          
          <div className="my-4">
            <Skeleton className="h-4 w-64 bg-gray-800 rounded-md italic" />
          </div>
          
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-11/12 bg-gray-800 rounded-md mb-2" />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
            <Skeleton className="h-6 w-48 bg-gray-800 rounded-md" />
          </div>
          
          {[1, 2, 3].map((item) => (
            <div key={item} className="ml-6 mb-4 border-l border-gray-800 pl-4">
              <Skeleton className="h-5 w-28 bg-gray-800 rounded-md mb-2" />
              <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-1" />
              <Skeleton className="h-4 w-11/12 bg-gray-800 rounded-md" />
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
            <Skeleton className="h-6 w-40 bg-gray-800 rounded-md" />
          </div>
          
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-11/12 bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-10/12 bg-gray-800 rounded-md mb-4" />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
            <Skeleton className="h-6 w-32 bg-gray-800 rounded-md" />
          </div>
          
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-11/12 bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-5/6 bg-gray-800 rounded-md mb-4" />
          
          <div className="my-4">
            <Skeleton className="h-4 w-72 bg-gray-800 rounded-md italic" />
          </div>
        </div>

        <div className="mb-10">
          <Skeleton className="h-5 w-28 bg-gray-800 rounded-md mb-3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20 bg-gray-800 rounded-full" />
            <Skeleton className="h-8 w-24 bg-gray-800 rounded-full" />
            <Skeleton className="h-8 w-28 bg-gray-800 rounded-full" />
            <Skeleton className="h-8 w-20 bg-gray-800 rounded-full" />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mb-8">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
          </div>
        </div>

        <div className="relative flex items-center mb-8">
          <Skeleton className="h-10 w-full bg-gray-800 rounded-lg" />
          <div className="absolute right-2">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-800" />
          <div>
            <Skeleton className="h-6 w-40 bg-gray-800 rounded-md mb-2" />
            <Skeleton className="h-4 w-28 bg-gray-800 rounded-md" />
          </div>
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-2" />
          <Skeleton className="h-4 w-4/5 bg-gray-800 rounded-md" />
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
          <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
          <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
          <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
        </div>
        
        <div className="flex justify-center">
          <Skeleton className="h-10 w-32 bg-gray-800 rounded-md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-5 w-5 rounded-full bg-gray-800" />
          <Skeleton className="h-6 w-24 bg-gray-800 rounded-md" />
        </div>
        
        {[1, 2].map((comment) => (
          <div key={comment} className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Skeleton className="h-5 w-32 bg-gray-800 rounded-md" />
                  <Skeleton className="h-4 w-16 bg-gray-800 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full bg-gray-800 rounded-md mb-1" />
                <Skeleton className="h-4 w-11/12 bg-gray-800 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};