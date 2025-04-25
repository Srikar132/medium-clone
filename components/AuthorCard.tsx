import Image from 'next/image';
import FollowButton from './FollowButton';
import { CustomAuthor } from './profile/follower-following/tabs';

export default function AuthorCard({
  author,
  isMeFollowing,
}: {
  author: CustomAuthor;
  isMeFollowing: boolean;
}) {
  return (
    <div className="w-64 h-fit bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-secondary rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center justify-between relative overflow-hidden border border-gray-100 dark:border-border">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-200 to-pink-500 dark:from-purple-600 dark:to-pink-600" />
      
      <div className="relative mt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden ring-2 ring-purple-200 dark:ring-purple-600/30 ring-offset-2 dark:ring-offset-card">
          {author.image ? (
            <Image
              src={author.image || "/default-avatar.jpg"}
              width={96}
              height={96}
              alt={`${author.name}'s profile image`}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl font-bold text-purple-500 dark:text-purple-300">
              {author?.name?.[0]?.toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-card" />
      </div>

      <div className="mt-2 text-center mb-3">
        <h3 className="text-lg font-bold text-gray-800 dark:text-foreground">{author.name}</h3>
        <p className="text-xs text-gray-500 dark:text-muted-foreground truncate max-w-full">{author.email}</p>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <span className="inline-block px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded-full">Writer</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
          {/* <span className="text-xs text-gray-500 dark:text-gray-400"></span> */}
        </div>
      </div>

      <FollowButton
        initialIsFollowed={isMeFollowing}
        authorId={author._id}
      />
    </div>
  );
}