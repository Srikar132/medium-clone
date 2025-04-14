import ArticleContent from "@/components/article/ArticleContent";
import ArticleSkeleton from "@/components/article/ArticleSkeleton";
import ArticleSheet from "@/components/article/ArticleSheet";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SanityError } from "@/types/sanity";

export const experimental_ppr = true;

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const id =(await  params)?.id;
    
    if (!id) {
      return notFound();
    }

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col">
        <ArticleSheet id={id}>
          <Suspense fallback={<ArticleSkeleton />}>
            <ArticleContent id={id} />
          </Suspense>
        </ArticleSheet>
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