import ArticleCard from "@/components/article/ArticleCard";
import { client } from "@/sanity/lib/client";
import { ALL_ARTICLES } from "@/sanity/lib/queries";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import SearchForm from "@/components/SearchForm";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams)?.query;
  const params = {
    search: query || null
  };

  const data = await client.fetch(ALL_ARTICLES, params);

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>

      <div className="my-4 md:hidden">
        <SearchForm query={query}/>
      </div>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        
        {query && (
          <div className="flex items-center">
            <p className="text-gray-600 dark:text-gray-300">
              {data.length} {data.length === 1 ? 'result' : 'results'} found for 
            </p>
            <Badge variant="outline" className="ml-2 font-medium">"{query}"</Badge>
          </div>
        )}
        <Separator className="mt-4" />
      </div>

      {query ? (
        <>
          {data.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((article: any, i: number) => (
                <div key={i} className="group transition-all duration-300  rounded-xl overflow-hidden">
                  <ArticleCard key={i} post={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">No articles found matching your search.</p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Try a different search term or browse all articles.</p>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center">
          <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Enter a search term to find articles.</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Use the search bar above to discover content.</p>
        </div>
      )}
      
      {data && data.length > 9 && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default page;