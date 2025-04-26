import Recommendations from "@/components/Recommandations";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileHeader from "@/components/profile/profile-header";
import { auth } from "@/auth";
import { Suspense } from "react";
import MainProfile from "@/components/profile/main-profile";
import MyArticles from "@/components/profile/my-articles";
import MyPreferences from "@/components/profile/liked-bookmarked";
import MyFollows from "@/components/profile/follower-following";
import LogoutButton from "@/components/LogoutBtn";

export const experimental_ppr = true;

const AuthorProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const id = (await params)?.id;
    const session = await auth();

    return (
      <div className="w-full min-h-screen pt-20">
        <Suspense fallback={<Skeleton className="w-full rounded-lg h-96" />}>
          <ProfileHeader id={id} session={session} />
        </Suspense>

        <section className="w-full mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 pb-20">
          <div className="w-full gap-y-5  md:col-span-2 min-h-screen">
            <Suspense
              fallback={<Skeleton className="w-full rounded-lg h-96" />}
            >
              <MainProfile id={id} session={session} />
            </Suspense>

            {/* My Articles -> published  , drafts , archived  */}
            {id === session?.id && (
            <>
              <Suspense
                fallback={<Skeleton className="w-full mt-10 rounded-lg h-96" />}
              >
                <MyArticles session={session} />
              </Suspense>

              <Suspense
                fallback={<Skeleton className="w-full mt-10 rounded-lg h-96" />}
              >
                <MyPreferences session={session} />
              </Suspense>

              {/* Followers/ Following */}
              <Suspense
                fallback={<Skeleton className="w-full mt-10 rounded-lg h-96" />}
              >
                <MyFollows session={session} />
              </Suspense>


              <div className="mt-10">
                <LogoutButton/>
              </div>
            
            </>
            )}
          </div>
          <aside className="lg:block relative">
            <div className="lg:sticky lg:top-10">
              <Recommendations />
            </div>
          </aside>
        </section>
      </div>
    );
  } catch (error) {
    return <></>;
  }
};

export default AuthorProfilePage;
