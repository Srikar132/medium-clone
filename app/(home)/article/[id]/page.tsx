

import ArticleContent from "@/components/article/ArticleContent";
import ArticleSkeleton from "@/components/article/ArticleSkeleton";
import ArticleSheet from "@/components/article/ArticleSheet";
import { Suspense} from "react";
import { notFound } from "next/navigation";
import { SanityError } from "@/types/sanity";


export const experimental_ppr = true;

const page = async ({params} : {params : {id : string}}) => {


  try {
      const id = (await params)?.id;

    
    return (
      <div className='fixed inset-0 bg-black/50 flex flex-col'>
          <ArticleSheet id={id}>
            <Suspense fallback={<ArticleSkeleton/>}>
              <ArticleContent id={id}/>
            </Suspense>
          </ArticleSheet>
      </div>
    )
  } catch (error) {
    if (error instanceof SanityError && error.status === 404) {
      notFound();
    }
    
    throw error;
  }
};

export default page;


