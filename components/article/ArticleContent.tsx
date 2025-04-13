import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR_ID, ARTICLE_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import PortableContent from "./PortableContent";
import ArticleInfo from "./ArticleInfo";
import { FaCommentAlt } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookmarkButton";
import FollowButton from "../FollowButton";
import ShareButton from "../ShareButton";

async function getArticleData(id: string, userId: string) {
  const post = await client.fetch(ARTICLE_BY_ID, { id, userId });
  return post;
}

async function getArticlesByAuthorId(authorId: string, userId: string) {
  const postsByAuthor = await client.fetch(ARTICLES_BY_AUTHOR_ID, {
    authorId,
    userId,
  });
  return postsByAuthor;
}

const ArticleContent = async ({ id }: { id: string }) => {
  const session = await auth();
  const userId = session?.id;

  const post = await getArticleData(id, userId as string);

  console.log(post)
  const [postsByThisAuthor] = await Promise.all([
    await getArticlesByAuthorId(post?.author?._id as string, userId as string),
  ]);

  return (
    <div className="container flex flex-col  mx-auto h-full w-full max-w-5xl px-6.5 lg:px-10">
      <article className="w-full h-auto pb-20 lg:p-5 pointer-events-auto space-y-4 mt-3">
        <header className="w-full space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl whitespace-pre-wrap max-w-1/2 font-bold tracking-wider">
              {post?.title}
            </span>
          </div>

          <div
            id="article-header"
            className="sticky top-96 z-[150] py-3 flex items-center gap-2 justify-between bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Link href={`/user/${post?._id}`}>
                <Image
                  className="w-10 h-10 rounded-full overflow-hidden"
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

            <div className="flex items-center gap-7">
              <LikeButton
                postId={post?._id}
                initialLikeCount={post?.likeCount}
                initialIsLiked={post?.isLiked}
              />
              <BookmarkButton postId={post?._id} initialBookmarked={post?.isBookmarked} />
              <FollowButton 
                authorId={post?.author._id}
                initialIsFollowed={post?.author.isFollowing}
              />
            </div>
          </div>
        </header>

        <main className="w-full mt-10">
          <div className="w-full h-auto ">
            <Image
              src={urlFor(post?.mainImage).url() as string}
              height={500}
              width={500}
              alt="Cover"
              className="w-full h-auto rounded-lg "
            />
          </div>

          <div className="mt-5">
            <span className="text-lg font-medium leading-relaxed">
              {post?.excerpt}
            </span>
          </div>

          <div className="w-full mt-10 py-5">
            <PortableContent value={post?.content.content} />
          </div>

          <div className="mx-auto w-full justify-center flex items-center gap-5">
            <LikeButton 
                postId={post?._id}
                initialLikeCount={post?.likeCount}
                initialIsLiked={post?.isLiked}
              />
            <BookmarkButton postId={post?._id} initialBookmarked={post?.isBookmarked}/>
            <ShareButton />
            <FaCommentAlt />
            <ArticleInfo />
          </div>

          <div className="w-full mt-5 mx-auto max-w-[70%] flex items-center">
            <hr className="h-px flex-1 bg-zinc-400" />
            <Link href={`/user/${post?._id}`}>
              <Image
                className="w-10 h-10 md:w-20 md:h-20 lg:w-30 lg:h-30 rounded-full overflow-hidden"
                height={20}
                width={40}
                src={post?.author?.image}
                alt="p"
              />
            </Link>
            <hr className="h-px flex-1 bg-zinc-400" />
          </div>

          <div className="flex items-center mt-5 flex-col space-y-3 justify-center mt-1">
            <h3 className="font-semibolf text-md">{post?.author?.username}</h3>
            <span className="font-thin text-sm">{post?.author?.bio}</span>
            <FollowButton authorId={post?.author._id}
              initialIsFollowed={post?.author.isFollowing}/>
          </div>
        </main>

        <footer className="w-full mt-10">
          <div className="w-full   flex flex-col space-y-5 container mx-auto">
            <h1 className="font-semibold text-lg  lg:text-xl ">
              More by {post?.author?.name}
            </h1>

            <ul className="mt-5 max-lg:divide-y-[1px] grid grid-cols-1 lg:grid-cols-2 gap-5">
              {postsByThisAuthor.map((post: any, i: number) => (
                <ArticleCard key={i} post={post} />
              ))}
            </ul>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ArticleContent;
