import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ALL_ARTICLES } from '@/sanity/lib/queries';
import { Category } from '@/sanity/types';
import Image from 'next/image';
import Link from 'next/link';
import Ping from './Ping';
import { CustomPost } from './article/ArticleCard';
import { Skeleton } from './ui/skeleton';

const RelatedPosts = async () => {
  const posts = await client.fetch(ALL_ARTICLES, {
    start: 0,
    end: 3,
    search: null,
  });

  return (
    <div className="pb-4 mt-5 ">
      <div className="c">
        <h2 className="flex items-center gap-x-2 text-xl font-bold mb-6">
          <Ping />
          Related Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post: CustomPost, i: number) => (
            <div
              key={i}
              className={`rounded-lg bg-card overflow-hidden flex flex-col border-b-4 border-violet-900 min-h-36`}
            >
              <div className="p-4 flex items-start space-x-4">
                <div className="flex-shrink-0 w-32 h-32 rounded overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title!}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <Link
                    href={`/article/${post.slug?.current}`}
                    className="font-bold mb-1 line-clamp-2 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-black dark:text-gray-200 text-sm mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-zinc-800 dark:text-gray-400 mt-3">
                    By {post.author.name}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post?.categories?.map((category: Category, index) => (
                    <Link
                      href={`/category/${category.slug?.current}`}
                      key={index}
                      className="text-xs font-medium text-zinc-800 dark:text-gray-400 dark:hover:text-white"
                    >
                      #{category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;

export const RelatedPostsSkeleton = () => {
  return (
    <div className="py-8 text-white">
      <div className="c">
        <h2 className="flex items-center gap-x-2 text-xl font-bold mb-6">
          <Skeleton className="w-60 h-28 rounded-lg" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).map((i: number) => (
            <Skeleton className="w-full rounded-lg h-72" />
          ))}
        </div>
      </div>
    </div>
  );
};
