import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookmarkButton";
import FollowButton from "../FollowButton";
import MoreByAuthor from "./MoreByAuthor";
import { Suspense } from "react";
import { Skeleton } from "../WritePageSkeleton";
import View from "../Views";
import { getArticleData } from "@/sanity/lib/fetches";
import { Category } from "@/sanity/types";
import Recommendations from "../Recommandations";
import MarkDownIt from "markdown-it";

import Ping from "../Ping";
import NavLink, { ColorVariant, colors } from "../ui/nav-link";
import { CustomPost } from "./ArticleCard";
import { Copy } from "lucide-react";
import { SocialLinks } from "./SocialButton";
import Comments from "../Comments";
import RelatedPosts, { RelatedPostsSkeleton } from "../RelatedPosts";
import ErrorCard from "../ErrorCard";

const md = MarkDownIt();

const ArticleContent = async ({ slug }: { slug: string }) => {
  try {
    const post: CustomPost = await getArticleData(slug);

    const parsedData = md.render(post?.content || "");

    return (
      <div className="w-full  relative">
        <div className="container flex flex-col mx-auto  w-full ">
          <article className="w-full h-auto pb-16  space-y-6 mt-3">
            <header className="w-full space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                {post?.title}
              </h1>

              <div className=" py-3 flex items-center justify-between ">
                <Link
                  href={`/profile/${post?.author?._id}`}
                  className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
                >
                  <div className="relative h-7 w-7 sm:h-10 sm:w-10 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
                    <Image
                      className="object-cover"
                      fill
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
                    initialLikeCount={post?.likeCount!}
                    initialIsLiked={post?.isLiked!}
                  />
                  <BookmarkButton
                    postId={post?._id}
                    initialBookmarked={post?.isBookmarked!}
                  />
                </div>
              </div>

              {post?.mainImage && (
                <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).url() as string}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                    alt={post.title || "Article cover"}
                    className="object-cover"
                  />
                </div>
              )}
            </header>

            <main className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
              <div className="w-full gap-y-5 md:col-span-2 min-h-screen  space-y-10 ">
                <div className="bg-white dark:bg-secondary-dark rounded-lg w-full h-auto p-3 sm:p-5 md:p-7">
                  <div className="mt-6">
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                      {post.excerpt}
                    </p>
                  </div>

                  {parsedData ? (
                    <article
                      className="prose dark:prose-invert break-all mt-10 pt-10 border-t"
                      dangerouslySetInnerHTML={{ __html: parsedData }}
                    />
                  ) : (
                    <p className="no-result">No details provided</p>
                  )}

                  <div className="categories my-10 gap-x-3 flex-wrap flex items-center border-b-2 border-dotted py-10">
                    <h3 className="flex items-center gap-x-3 tracking-wider font-medium relative">
                      <Ping className="animate-pulse" />
                      <span className="relative">Categories</span>
                    </h3>
                    {post.categories?.map(
                      (category: Category, index: number) => (
                        <NavLink
                          key={index}
                          variant={colors[index] as ColorVariant}
                          title={category.title!}
                          showUnderline={false}
                        />
                      )
                    )}
                  </div>
                  <div className="flex flex-col items-center py-">
                    <div className="text-gray-400 mb-4">Share Article</div>

                    <SocialLinks />

                    <div className="search-form dark:bg-gray-900/70!">
                      <input
                        type="text"
                        value={`https://meduim-clone.com/${slug}`}
                        readOnly
                        className="search-input"
                      />
                      <button className="text-pink-500 search-btn">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-secondary-dark rounded-lg w-full h-auto p-3 sm:p-5 md:p-7 relative mt-20">
                  <div className="w-38 h-36 absolute left-1/2 -translate-x-1/2 -top-[72px] rounded-full overflow-hidden mb-3">
                    <Image
                      src={post?.author?.image || "/default-avatar.jpg"}
                      width={50}
                      height={50}
                      alt="Jessica Smith"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center py-8 pt-24">
                    <div className="text-sm dark:text-gray-400 text-black/50 mb-1">
                      Author
                    </div>
                    <div className="dark:text-white text-black font-medium mb-4">
                      {post?.author?.name}
                    </div>

                    <p className="dark:text-gray-300 text-black/60 text-center italic text-sm mb-6 max-w-lg">
                      {post?.author?.bio ||
                        "I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the  present moment, and yet I feel that I never was a greater artist than now."}
                    </p>

                    {/*  */}
                    <SocialLinks />

                    <FollowButton
                      authorId={post?.author._id}
                      initialIsFollowed={post.isFollowing!}
                    />
                  </div>
                </div>

                <div
                  className="
                bg-white dark:bg-secondary-dark rounded-lg w-full h-auto p-3 sm:p-5 md:p-7 relative mt-10"
                >
                  <Comments id={post._id} />
                </div>

                <Suspense fallback={<>Loading..</>}>
                  <MoreByAuthor
                    authorId={post?.author?._id}
                    currentPostId={post._id}
                  />
                </Suspense>
              </div>

              <aside className="lg:block relative">
                <div className="lg:sticky lg:top-10">
                  <Recommendations />
                </div>
              </aside>
            </main>

            <footer className="w-full mt-12 pt-8">
              <Suspense fallback={<RelatedPostsSkeleton/>}>
                <RelatedPosts/>
              </Suspense>
            </footer>
          </article>
        </div>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={post._id} />
        </Suspense>
      </div>
    );
  } catch (error: any) {
    return (
      <ErrorCard/>
    );
  }
};

export default ArticleContent;
