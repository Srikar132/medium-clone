import ArticleContent from "@/components/ArticleContent";
import ArticleSheet from "@/components/ArticleSheet";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import Link from "next/link";
import { Suspense, experimental_taintObjectReference } from "react";
import { IoClose } from "react-icons/io5";

export const experimental_ppr = true;

const page = async ({params} : {params : {id : string}}) => {
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
};

export default page;


