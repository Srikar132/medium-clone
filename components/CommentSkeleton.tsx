const CommentSkeleton = () => {
    return (
      <div className="animate-pulse flex gap-4 items-start p-4 border rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-zinc-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-zinc-700 rounded" />
          <div className="w-full h-3 bg-gray-300 dark:bg-zinc-700 rounded" />
          <div className="w-4/5 h-3 bg-gray-300 dark:bg-zinc-700 rounded" />
        </div>
      </div>
    );
  };
  
  export default CommentSkeleton;
  