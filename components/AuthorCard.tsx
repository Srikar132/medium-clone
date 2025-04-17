import Image from 'next/image';
import FollowButton from './FollowButton';

interface SocialLink {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

interface AuthorProps {
  _id: string;
  name: string;
  image?: string;
  bio?: string;
  email: string;
  socialLink: SocialLink;

}

export default function AuthorCard({ author , isMeFollowing }: { author: AuthorProps; isMeFollowing: boolean; }) {
  return (
    <div className="w-full p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 hover:shadow-md transition-shadow duration-200">
      
      <div className="flex items-center gap-4 w-full">
        <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-white text-xl font-semibold">
          {author.image ? (
            <Image
              src={author.image}
              width={56}
              height={56}
              alt={`${author.name}'s profile image`}
              className="object-cover w-full h-full"
            />
          ) : (
            <span>{author?.name?.[0]?.toUpperCase()}</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-lg text-gray-800">{author.name}</span>
          <span className="text-sm text-gray-500 break-all">{author.email}</span>
        </div>
      </div>

      {/* Follow Button */}
      <div className="self-end sm:self-auto">
        <FollowButton
          initialIsFollowed={isMeFollowing}
          authorId={author._id}
        />
      </div>
    </div>
  );
}
