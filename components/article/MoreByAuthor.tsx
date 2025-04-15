import React from 'react'
import ArticleCard from './ArticleCard'
import { getArticlesByAuthorIdExceptCurrent } from '@/sanity/lib/fetches';

const MoreByAuthor = async ({
    authorId,
    currentPostId
} : {
    authorId : string;
    currentPostId : string;
}) => {

    const postsByThisAuthor = await getArticlesByAuthorIdExceptCurrent(
        authorId,
        currentPostId
      );

  return (
    <div className="w-full space-y-6">
        <h2 className="font-semibold text-xl md:text-2xl">
            More by {postsByThisAuthor?.author?.name}
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsByThisAuthor.length > 0 ? postsByThisAuthor.map((relatedPost: any, i: number) => (
                <ArticleCard key={i} post={relatedPost} />
            )) : (
                <span className='font-thin text-sm'>No articles by this author</span>
            )}
        </div>
  </div>
  )
}

export default MoreByAuthor