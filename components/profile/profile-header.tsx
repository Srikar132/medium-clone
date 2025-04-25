import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import { Session } from "next-auth";
import Image from "next/image";

const ProfileHeader = async ({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) => {
  const author = await client.fetch(AUTHOR_BY_ID, {
    id,
    userId: session?.id || null,
  });

  return (
    <div className="w-full  p-8 rounded-lg shadow-lg bg-white dark:bg-card ">
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        {/* Author Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-center">
            <div className="text-gray-400 text-sm font-medium mb-1">Author</div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-pink-500">#</span>
              {author?.name}
            </h1>
          </div>
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={author?.image || "/default-avatar.jpg"}
              alt="Author profile picture"
              width={96}
              height={96}
              className="rounded-full w-full h-full border-4 border-pink-500 shadow-md"
            />
          </div>
        </div>

        <div className="text-center text-gray-300 italic mb-8 max-w-2xl">
          <p>
            I am so happy, my dear friend, so absorbed in the exquisite sense of
            mere tranquil existence, that I neglect my talents. I should be
            incapable of drawing a single stroke at the present moment; and yet
            I feel that I never was a greater artist than now.
          </p>
        </div>
        <div className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 text-sm">
          21 Articles
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
