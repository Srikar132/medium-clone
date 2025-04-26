import React from "react";
import { getArticlesByAuthorIdExceptCurrent } from "@/sanity/lib/fetches";
import Ping from "../Ping";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CustomPost } from "./ArticleCard";
import Link from "next/link";

const MoreByAuthor = async ({
  authorId,
  currentPostId,
}: {
  authorId: string;
  currentPostId: string;
}) => {
  const postsByThisAuthor = await getArticlesByAuthorIdExceptCurrent(
    authorId,
    currentPostId
  );

  return (
    <div className="w-full space-y-6">
      <div className="py-6">
        <div className="flex items-center mb-6 gap-x-5">
          <Ping />
          <h3 className="text-white text-sm font-medium">Other Articles</h3>
        </div>

        <div className="grid grid-cols-1 md::grid-cols-2 gap-2">
          {postsByThisAuthor.length == 0 
           ? (<span className="text-sm font-medium">Author has no more artiles.</span>)
           :postsByThisAuthor.map((post: CustomPost, i: number) => (
            <div key={i} className="flex items-center rounded-lg p-3 hover:bg-opacity-70 bg-secondary-dark transition-colors rounded-lg border  cursor-pointer gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(post?.mainImage).url() || "/default-avatar.jpg"}
                  height={30}
                  width={30}
                  alt="Healthy Cooking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mr-4">
                <Link
                  href={`/article/${post.slug?.current}`}
                  className="font-bold mb-1 hover:underline"
                >
                  <h4 className="text-white line-clamp-1 text-sm font-medium">
                    {post?.title}
                  </h4>
                </Link>
                <h4 className="text-gray-50 line-clamp-1 text-xs font-medium">
                  {post.excerpt}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreByAuthor;
