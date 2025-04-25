import {
    getFollowers,
    getFollowing,
  } from "@/sanity/lib/fetches";
  import { Session } from "next-auth";
  import ErrorCard from "@/components/ErrorCard";
  import { CustomAuthor, FollowTabs } from "./tabs";
  import Ping from "@/components/Ping";
  
  const MyFollows = async ({ session }: { session: Session | null }) => {
    try {
      const [myFollowers, follwing]: [CustomAuthor[], CustomAuthor[]] = await Promise.all(
        [await getFollowers(session), await getFollowing(session)]
      );
  
      return (
        <div className="flex w-full mt-10 flex-col">
          <h3 className="flex mb-5  w-full items-center gap-x-3 tracking-wider font-medium relative">
            <Ping className="animate-pulse" />
            <span className="relative text-2xl font-bold">Authors</span>
          </h3>
          <div className="bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-background ">
            <section className="w-full rounded-xl overflow-hidden bg-white dark:bg-card shadow-lg dark:shadow-md dark:shadow-black/10">
              <div className="px-6 py-5  sm:px-8 h-auto w-full">
                  <FollowTabs
                    myFollowers={myFollowers}
                    following={follwing}
                  />
              </div>
            </section>
          </div>
        </div>
      );
    } catch (error) {
      return <ErrorCard title="Failed to load your articles" />;
    }
  };
  
  export default MyFollows;
  