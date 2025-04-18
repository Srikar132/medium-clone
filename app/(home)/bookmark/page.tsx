import { getBookmarkedArticles } from "@/sanity/lib/fetches";
import PublishedCard from "@/components/PublishedCard";


const page = async () => {
  try {
    const bookmarkedArticles = await getBookmarkedArticles();

    return (
      <div className="w-full h-screen p-5 lg:p-10">

        <div className="w-full max-w-7xl mx-auto py-8">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                You haven't BOOKMARKED any posts yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 w-full">
              {bookmarkedArticles.map((item: any, i: number) => (
                <PublishedCard
                  key={i}
                  post={item.post}
                  variant="bookmarked"
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error : any) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">
            Error loading bookmarks. Please try again later. 
            - {(error?.message)}
          </p>
        </div>
      </div>
    );
  }
};

export default page;
