export default function WritePageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto h-full">
      <div className="relative w-full flex items-center">
        <div className="w-full h-64 relative">
          <Skeleton className="w-full h-full rounded-t-lg" />
          <Skeleton className="absolute bottom-4 right-4 h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <Skeleton className="h-10 w-2/3 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="w-full h-32 relative">
          <Skeleton className="w-full h-full rounded-t-lg" />
          <Skeleton className="absolute bottom-4 right-4 h-8 w-8 rounded-full" />
        </div>
    </div>
  );
}

export function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-200 ${className}`} />;
};