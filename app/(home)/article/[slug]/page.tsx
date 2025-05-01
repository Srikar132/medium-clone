import { CustomPost } from '@/components/article/ArticleCard';
import ArticleContent from '@/components/article/ArticleContent';
import { getArticleData } from '@/sanity/lib/fetches';
import { SanityError } from '@/types/sanity';
import { notFound } from 'next/navigation';

export const experimental_ppr = true;

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const slug = (await params)?.slug;

    const post: CustomPost = await getArticleData(slug);

    if (!slug) {
      return notFound();
    }

    return (
      <div className="w-full min-h-screen mt-20">
        <ArticleContent post={post} />
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
