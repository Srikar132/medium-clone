import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import { Session } from "next-auth";
import {
    Heart,
    Mail,
    Users,
    MapPin,
    Calendar,
    ExternalLink,
    BookOpen,
  } from "lucide-react";
import { Edit, LucideNotebookPen } from "lucide-react";

import { FaLinkedin, FaInstagram, FaFacebook, FaPlus } from "react-icons/fa";
import AnimatedCounter from "@/components/AnimatedCounter";
import { format } from "date-fns";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";

const MainProfile = async ({
    id,
    session,
  }: {
    id: string;
    session: Session | null;
  }) => {
    try {
      const author = await client.fetch(AUTHOR_BY_ID, {
        id,
        userId: session?.id || null,
      });
  
      const memberSinceFormatted: string = author?.memberSince
        ? format(new Date(author.memberSince), "MMMM yyyy")
        : "--/--";
  
      return (
        <div className="bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-background ">
          <section className="w-full rounded-xl overflow-hidden bg-white dark:bg-card shadow-lg dark:shadow-md dark:shadow-black/10">
            <div className="pt-20 px-6 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b dark:border-border pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-foreground">
                      {author?.name}
                    </h1>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium">
                      Pro
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    @{author?.username}
                  </p>
  
                  <div className="flex items-center gap-6 mt-3 flex-wrap">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <Mail size={14} className="mr-1" />
                      <span className="truncate">{author?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>{author?.location || "Not specified"}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>Joined {memberSinceFormatted}</span>
                    </div>
                  </div>
                </div>
  
                <div className="flex gap-2">
                  <FollowButton
                    initialIsFollowed={author?.isFollowing}
                    authorId={id}
                  />
                  {session?.id === author._id && (
                    <>
                      <Link
                        href="/profile/edit"
                        className="border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-4 py-1 rounded-full transition-colors flex items-center gap-2"
                      >
                        <Edit size={15} /> Edit
                      </Link>
                      <Link
                        href="/post/new"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white px-4 py-1 rounded-full transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <BookOpen size={15} /> New Post
                      </Link>
                    </>
                  )}
                </div>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b dark:border-border">
                <div className="flex justify-around items-center group">
                  <AnimatedCounter
                    value={author?.followerCount}
                    label="Followers"
                    icon={
                      <Users
                        size={24}
                        className="text-blue-500 group-hover:scale-110 transition-transform"
                      />
                    }
                  />
                </div>
                <div className="flex justify-center group">
                  <AnimatedCounter
                    value={author?.likeCount}
                    label="Total Likes"
                    icon={
                      <Heart
                        size={24}
                        className="text-red-500 group-hover:scale-110 transition-transform"
                      />
                    }
                  />
                </div>
                <div className="flex justify-center group">
                  <AnimatedCounter
                    value={author?.followingCount}
                    label="Published"
                    icon={
                      <LucideNotebookPen
                        size={24}
                        className="text-green-500 group-hover:scale-110 transition-transform"
                      />
                    }
                  />
                </div>
              </div>
  
              <div className="py-8 border-b dark:border-border">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-foreground mb-4">
                  About
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {author?.bio || "This user hasn't added a bio yet."}
                </p>
              </div>
  
              <div className="py-6 border-b dark:border-border">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-foreground mb-5">
                  Social Links
                </h2>
                <div className="flex flex-row gap-6">
                  {author?.socialLinks?.linkedin ? (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-accent rounded-full shadow-md hover:shadow-lg transition-all"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin
                        size={22}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </a>
                  ) : (
                    <div className="relative p-3 border dark:border-gray-700 cursor-pointer rounded-full hover:bg-gray-50 dark:hover:bg-secondary w-fit transition-all">
                      <Link href="/profile/edit">
                        <FaLinkedin
                          size={22}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </Link>
                      <FaPlus
                        className="absolute text-gray-600 dark:text-gray-400 text-md font-medium p-[2px] bg-white dark:bg-card rounded-full"
                        style={{ top: "-4px", right: "-4px" }}
                      />
                    </div>
                  )}
                  {author?.socialLinks?.instagram ? (
                    <a
                      href={author.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-accent rounded-full shadow-md hover:shadow-lg transition-all"
                      aria-label="Instagram"
                    >
                      <FaInstagram
                        size={22}
                        className="text-pink-600 dark:text-pink-400"
                      />
                    </a>
                  ) : (
                    <div className="relative p-3 border dark:border-gray-700 cursor-pointer rounded-full hover:bg-gray-50 dark:hover:bg-secondary w-fit transition-all">
                      <Link href="/profile/edit">
                        <FaInstagram
                          size={22}
                          className="text-pink-600 dark:text-pink-400"
                        />
                      </Link>
                      <FaPlus
                        className="absolute text-gray-600 dark:text-gray-400 text-md font-medium p-[2px] bg-white dark:bg-card rounded-full"
                        style={{ top: "-4px", right: "-4px" }}
                      />
                    </div>
                  )}
                  {author?.socialLinks?.facebook ? (
                    <a
                      href={author.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-secondary hover:bg-gray-100 dark:hover:bg-accent rounded-full shadow-md hover:shadow-lg transition-all"
                      aria-label="Facebook"
                    >
                      <FaFacebook
                        size={22}
                        className="text-blue-800 dark:text-blue-500"
                      />
                    </a>
                  ) : (
                    <div className="relative p-3 border dark:border-gray-700 cursor-pointer rounded-full hover:bg-gray-50 dark:hover:bg-secondary w-fit transition-all">
                      <Link href="/profile/edit">
                        <FaFacebook
                          size={22}
                          className="text-blue-800 dark:text-blue-500"
                        />
                      </Link>
                      <FaPlus
                        className="absolute text-gray-600 dark:text-gray-400 text-md font-medium p-[2px] bg-white dark:bg-card rounded-full"
                        style={{ top: "-4px", right: "-4px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
  
              {/* <div className="py-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-foreground">
                    Featured Content
                  </h2>
                  <a
                    href={`/articles/author/${id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center text-sm font-medium transition-colors"
                  >
                    View all posts <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
    
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {featured.length > 0 ? featured.map((post: any, i: number) => (
                    <Link
                      href={`/article/${post?._id}`}
                      key={i}
                      className="group border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300"
                    >
                      <div className="h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <Image
                          src={urlFor(post?.mainImage).url()}
                          height={200}
                          width={300}
                          alt={post?.title || "Featured post"}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {post?.title}
                        </h3>
                        <span className="text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 text-sm">
                          {post?.excerpt}
                        </span>
                      </div>
                    </Link>
                  )) : (
                    <div className="col-span-3 flex flex-col items-center justify-center py-10 text-center">
                      <LucideNotebookPen size={40} className="text-gray-400 dark:text-gray-600 mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">No featured posts yet</p>
                      {session?.id === author._id && (
                        <Link 
                          href="/post/new" 
                          className="mt-3 inline-flex items-center gap-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          <BookOpen size={16} /> Create your first post
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </section>
        </div>
      );
    } catch (error) {
      return (
        <></>
      )
    }
  };
  


export default MainProfile