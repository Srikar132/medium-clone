import { Skeleton } from '@/components/ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="w-full mt-20 relative">
      <div className="container flex flex-col mx-auto w-full">
        <article className="w-full h-auto pb-16 space-y-6 mt-3">
          {/* Header Skeleton */}
          <header className="w-full space-y-4">
            {/* Title Skeleton */}
            <Skeleton className="h-10 w-3/4" />

            {/* Author and Actions Skeleton */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* Main Image Skeleton */}
            <Skeleton className="w-full aspect-video rounded-lg" />
          </header>

          <main className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
            <div className="w-full gap-y-5 md:col-span-2 min-h-screen space-y-10">
              {/* Article Content Skeleton */}
              <div className="rounded-lg w-full h-auto p-3 sm:p-5 md:p-7">
                {/* Excerpt Skeleton */}
                <div className="mt-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-5/6 mb-2" />
                  <Skeleton className="h-6 w-4/6" />
                </div>

                {/* Article Body Skeleton */}
                <div className="mt-10 pt-10 space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Categories Skeleton */}
                <div className="my-10 gap-x-3 flex-wrap flex items-center border-b-2 border-dotted py-10">
                  <Skeleton className="h-4 w-24 mr-3" />
                  <Skeleton className="h-8 w-20 rounded-full mr-2" />
                  <Skeleton className="h-8 w-20 rounded-full mr-2" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>

                {/* Share Section Skeleton */}
                <div className="flex flex-col items-center py-4">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-full max-w-md" />
                </div>
              </div>

              {/* Author Card Skeleton */}
              <div className="rounded-lg w-full h-auto p-3 sm:p-5 md:p-7 relative mt-20">
                <Skeleton className="w-36 h-36 absolute left-1/2 -translate-x-1/2 -top-[72px] rounded-full" />
                <div className="flex flex-col items-center py-8 pt-24">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-36 mb-4" />
                  <div className="max-w-lg w-full space-y-2 mb-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mx-auto" />
                    <Skeleton className="h-4 w-4/5 mx-auto" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-36" />
                </div>
              </div>

              {/* Comments Section Skeleton */}
              <div className="rounded-lg w-full h-auto p-3 sm:p-5 md:p-7 relative mt-10">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="space-y-8">
                  {/* Comment 1 */}
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                  {/* Comment 2 */}
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* More By Author Skeleton */}
              <div>
                <Skeleton className="h-8 w-56 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="space-y-3">
                      <Skeleton className="w-full aspect-video rounded-lg" />
                      <Skeleton className="h-6 w-5/6" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <aside className="lg:block relative">
              <div className="lg:sticky lg:top-10">
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-3">
                      <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </main>

          {/* Related Posts Skeleton */}
          <footer className="w-full mt-12 pt-8">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-3">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </footer>
        </article>
      </div>

      {/* View Counter Skeleton */}
      <div className="fixed bottom-6 right-6">
        <Skeleton className="h-12 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default PostSkeleton;
