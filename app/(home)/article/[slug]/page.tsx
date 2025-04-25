import ArticleContent from "@/components/article/ArticleContent";
import { notFound } from "next/navigation";
import { SanityError } from "@/types/sanity";

export const experimental_ppr = true;

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const slug =(await  params)?.slug;
    
    if (!slug) {
      return notFound();
    }
    

    return (
      <div className="w-full min-h-screen mt-20">
        <ArticleContent slug={slug}/>
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