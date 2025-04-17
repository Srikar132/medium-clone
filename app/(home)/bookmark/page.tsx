import { getBookmarkedArticles } from "@/sanity/lib/fetches";
import PublishedCard from "@/components/PublishedCard";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

async function removeBookmark(postId: string): Promise<void> {
  "use server";

  try {
    const session = await auth();
    const userId = session?.id;
    const bookmarkQuery = ` *[_type == "bookmark" && post._ref == $postId && author._ref == $userId][0]._id`;
    const bookmarkId = await client.fetch(bookmarkQuery, { postId, userId });

    if (bookmarkId) {
      await writeClient.delete(bookmarkId);
    } else {
    }
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
}

const page = async () => {
  try {
    const bookmarkedArticles = await getBookmarkedArticles();

    return (
      <div className="w-full h-screen p-5 lg:p-10">
        <div className="w-full mx-auto max-w-3xl flex flex-col gap-3 items-center justify-between p-2 sm:p-5 md:p-6 lg:p-7">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cursive ">
            bookmarked articles
          </h1>
          <p className="text-sm font-sans text-pink-800">
            "Your bookmarks are not just saved links — they’re seeds of future
            wisdom waiting to be explored."{" "}
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto py-8">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                You haven't BOOKMARKED any posts yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-4 gap-5 w-full">
              {bookmarkedArticles.map((item: any, i: number) => (
                <PublishedCard
                  key={i}
                  post={item.post}
                  variant="bookmarked"
                  onRemoveBookmark={removeBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error ) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">
            Error loading drafts. Please try again later. 
            - (error?.message)
          </p>
        </div>
      </div>
    );
  }
};

export default page;
