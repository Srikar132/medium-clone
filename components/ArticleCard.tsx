import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const ArticleCard = ({ post }: { post: any  }) => {
  return (
    <div className="w-full p-2 pb-5">
      <div className="flex items-center gap-2">
        <Link href={`/user/${post?.author?._id}`}>
          <Image
            className="w-5 h-5 rounded-full overflow-hidden"
            height={20}
            width={20}
            src={post?.author?.image}
            alt="p"
          />
        </Link>
        <span className="text-xs font-black/50 font-thin tracking-wider">
          by {post?.author?.name}
        </span>
      </div>
      <div className="grid grid-cols-3 mt-2">
        <div className="col-span-2 flex flex-col gap-5">
          <Link
            href={`/article/${post?._id}`}
            className="font-semibold text-xl line-clamp-2"
          >
            {post?.title}
          </Link>
          <span
            className=" text-xs font-medium dark:text-gray-300 text-black
                50tracking-woder line-clamp-2"
          >
            {post?.excerpt}
          </span>
        </div>

        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <Link href={`/article/${post?._id}`}>
            <Image
              src={urlFor(post?.mainImage).url() as string}
              height={100}
              width={100}
              alt="cover"
              className="object-cover"
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-5">
        <span className="text-xs leading-relaxed dark:text-gray-400 text-zinc-700">
          {formatDate(new Date(post?.publishedAt))}
        </span>
        <Link
          href={`/article/${post?._id}`}
          className="flex items-center gap-1"
        >
          <FcLike />
          <span className="text-xs ">{post?.likeCount}</span>
        </Link>
        <Link
          href={`/article/${post?._id}`}
          className="flex items-center gap-1"
        >
          <FaCommentAlt />
          <span className="text-xs ">{post?.commentCount}</span>
        </Link>

        <div className="ml-auto justify-center w-[30%] flex items-center gap-5">
          <Link href={`/article/${post?._id}`}>
            {post?.isBookmarked ?  <BsBookmarkPlusFill/>  :<BsBookmarkPlus />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
