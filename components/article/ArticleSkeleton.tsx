const ArticleSkeleton = () => {
    return (
      <div className="w-full h-screen overflow-y-auto px-4 py-6 space-y-6 animate-pulse">
        
        {/* Title */}
        <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
  
        {/* Author Info */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex space-x-4">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
  
        {/* Cover Image */}
        <div className="w-full h-[200px] md:h-[300px] bg-gray-300 dark:bg-gray-700 rounded-lg" />
  
        {/* Excerpt */}
        <div className="w-11/12 h-5 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
  
        {/* Main Content Blocks */}
        <div className="space-y-4 mt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full space-y-2">
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
  
        {/* Footer Separator */}
        <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mt-8" />
  
        {/* Author Again */}
        <div className="flex flex-col items-center space-y-2 mt-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="w-48 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
  
        {/* Suggested Articles */}
        <div className="mt-10 space-y-2">
          <div className="w-2/3 h-6 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
          <div className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 h-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ArticleSkeleton;
  