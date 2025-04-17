import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import PortableContent from "./PortableContent";
import ArticleInfo from "./ArticleInfo";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookmarkButton";
import FollowButton from "../FollowButton";
import ShareButton from "../ShareButton";
import { Suspense, memo } from "react";
import { Skeleton } from "../WritePageSkeleton";
import View from "../Views";
import { getArticleData } from "@/sanity/lib/fetches";
import MoreByAuthor from "./MoreByAuthor";
import { Author, Post } from "@/sanity/types";

type ArticleWithCounts = Omit<Post, "author"> & {
  author: Author;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  commentCount: number;
  isFollowing: boolean;
};

const ArticleContent = async ({ id }: { id: string }) => {
  try {
    const post: ArticleWithCounts = await getArticleData(id);

    return (
      <div className="w-full h-full relative">
        <div className="container flex flex-col mx-auto h-full w-full max-w-4xl px-4 lg:px-8">
          <article className="w-full h-auto pb-16 pointer-events-auto space-y-6 mt-3">
            <header className="w-full space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                {post?.title}
              </h1>

              <div className=" py-3 flex items-center justify-between bg-white/95 dark:bg-zinc-950/95">
                <Link
                  href={`/profile/${post?.author?._id}`}
                  className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
                    <Image
                      className="object-cover"
                      fill
                      sizes="40px"
                      src={post?.author?.image || "/default-avatar.jpg"}
                      alt={post?.author?.name || "Author"}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {post?.author?.name}
                  </span>
                </Link>

                <div className="flex items-center gap-4">
                  <LikeButton
                    postId={post?._id}
                    initialLikeCount={post?.likeCount}
                    initialIsLiked={post?.isLiked}
                  />
                  <BookmarkButton
                    postId={post?._id}
                    initialBookmarked={post?.isBookmarked}
                  />
                  <FollowButton
                    authorId={post?.author._id}
                    initialIsFollowed={post?.isFollowing}
                  />
                </div>
              </div>
            </header>

            <main className="w-full mt-6 space-y-8">
              {post?.mainImage && (
                <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).url() as string}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                    alt={post.title || "Article cover"}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mt-6">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                  {post?.excerpt}
                </p>
              </div>

              <div className="w-full mt-8 py-4 prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none">
                <PortableContent value={post?.content?.content} />
              </div>

              <div className="mx-auto w-full justify-center lg:hidden flex items-center gap-6 py-4">
                <LikeButton
                  postId={post?._id}
                  initialLikeCount={post?.likeCount}
                  initialIsLiked={post?.isLiked}
                />
                <BookmarkButton
                  postId={post?._id}
                  initialBookmarked={post?.isBookmarked}
                />
                <ShareButton id={id} />
                <ArticleInfo id={id} />
              </div>

              <div className="w-full mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center text-center">
                  <Link
                    href={`/profile/${post?.author?._id}`}
                    className="block relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 mb-4"
                  >
                    <Image
                      fill
                      sizes="(max-width: 768px) 64px, 80px"
                      src={post?.author?.image || "/default-avatar.jpg"}
                      alt={post?.author?.name || "Author"}
                      className="object-cover"
                    />
                  </Link>

                  <h3 className="font-semibold text-lg mb-2">
                    {post?.author?.username}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md mb-4">
                    {post?.author?.bio}
                  </p>

                  <FollowButton
                    authorId={post?.author._id}
                    initialIsFollowed={post?.isFollowing}
                  />
                </div>
              </div>
            </main>

            <footer className="w-full mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <Suspense fallback={<>Loading..</>}>
                <MoreByAuthor authorId={post?.author?._id} currentPostId={id} />
              </Suspense>
            </footer>
          </article>
        </div>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </div>
    );
  } catch (error: any) {
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">
          Error loading article. Please try again later. -{error?.message}
        </p>
      </div>
    </div>;
  }
};

export default memo(ArticleContent);
