import Image from 'next/image';
import FollowButton from './FollowButton';
import { Author } from '@/sanity/types';

export default function AuthorCard({
  author,
  isMeFollowing,
}: {
  author: Author;
  isMeFollowing: boolean;
}) {
  return (
    <div className="w-64 h-fit bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center justify-between relative overflow-hidden border border-gray-100 ">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-200 to-pink-500" />
      
      <div className="relative mt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden ring-2 ring-purple-200 ring-offset-2">
          {author.image ? (
            <Image
              src={author.image}
              width={96}
              height={96}
              alt={`${author.name}'s profile image`}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl font-bold text-purple-500">{author?.name?.[0]?.toUpperCase()}</span>
          )}
        </div>
        
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
      </div>

      <div className="mt-2 text-center mb-3">
        <h3 className="text-lg font-bold text-gray-800">{author.name}</h3>
        <p className="text-xs text-gray-500 truncate max-w-full">{author.email}</p>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <span className="inline-block px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">Writer</span>
          <span className="text-xs text-gray-400">•</span>
          {/* <span className="text-xs text-gray-500"></span> */}
        </div>
      </div>

      <FollowButton
        initialIsFollowed={isMeFollowing}
        authorId={author._id}
      />
    </div>
  );
}