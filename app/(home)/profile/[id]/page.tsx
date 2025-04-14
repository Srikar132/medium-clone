import React from "react";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import { Edit, LucideNotebookPen } from "lucide-react";
import {
  Heart,
  Mail,
  Users,
  MapPin,
  Calendar,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaPlus } from "react-icons/fa";
import AnimatedCounter from "@/components/AnimatedCounter";
import { format } from "date-fns";
import Link from "next/link";
import { auth } from "@/auth";
import { getFeaturedPostsByAuthor } from "@/sanity/lib/fetches";
import { urlFor } from "@/sanity/lib/image";
import FollowButton from "@/components/FollowButton";
import { SanityError } from "@/types/sanity";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {


  try {
    const id = (await params)?.id;
    const session = await auth();
  
  
    const [author , featured] = await Promise.all([
      await client.fetch(AUTHOR_BY_ID, { id , userId : session?.id }),
      await getFeaturedPostsByAuthor(id , 3)
    ]);
  
  
    const memberSinceFormatted : string = author?.memberSince
      ? format(new Date(author.memberSince), "MMMM yyyy")
      : "--/--";
  
    return (
      <div className="min-h-screen py-8">
        <section className="w-full mx-auto max-w-4xl bg-white rounded-xl overflow-hidden">
          <div className="h-30   relative">
            <div className="absolute -bottom-16 left-6 sm:left-8 border-4 border-white hover:border-pink-500 rounded-full shadow-lg">
              <Image
                src={author?.image}
                alt={author?.name}
                width={120}
                height={120}
                className="rounded-full object-cover h-32 w-32"
                priority
              />
            </div>
          </div>
          <div className="pt-20 px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {author?.name}
                  </h1>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    Pro
                  </span>
                </div>
                <p className="text-gray-600 mt-1">@{author?.username}</p>
  
                <div className="flex items-center gap-6 mt-3 flex-wrap">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail size={14} className="mr-1" />
                    <span className="truncate">{author?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{author?.location || "Not specified"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
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
                <button className={`border border-gray-300 cursor-pointer hover:border-gray-400 text-gray-700 px-4 py-1 rounded-full transition-colors items-center gap-2 ${session?.id == author._id ? "flex" : "hidden"}`}>
                  <Edit size={15} /> edit
                </button>
              </div>
            </div>
  
            <div className="grid grid-col-2 sm:grid-cols-3 gap-4 py-6 border-b">
              <div className="flex justify-around items-center">
                <AnimatedCounter
                  value={author?.followerCount}
                  label="Followers"
                  icon={<Users size={24} className="text-blue-500" />}
                />
              </div>
              <div className="flex justify-center">
                <AnimatedCounter
                  value={author?.likeCount}
                  label="Total Likes"
                  icon={<Heart size={24} className="text-red-500" />}
                />
              </div>
              <div className="flex justify-center">
                <AnimatedCounter
                  value={author?.followingCount}
                  label="Published"
                  icon={
                    <LucideNotebookPen
                      size={24}
                      className="text-green-500"
                    />
                  }
                />
              </div>
            </div>
  
            <div className="py-8 border-b">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {author?.bio || "This user hasn't added a bio yet."}
              </p>
            </div>
  
            <div className="py-6 border-b flex space-x-5">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                  Social Links
                </h2>
                <div className="flex flex-row gap-12">
                  {author?.socialLinks?.linkedin ? (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={25} className="text-blue-600" />
                    </a>
                  ) : (
                    <>
                      <div className="relative p-2 border cursor-pointer rounded-full hover:bg-sky-50 w-fit">
                        <Link href="/"><FaLinkedin size={25} className="text-blue-600" /></Link>
                        <FaPlus
                          className="absolute text-gray-600 text-md font-medium p-[2px]"
                          style={{ top: "-4%", right: "-4%" }}
                        />
                      </div>
                    </>
                  )}
                  {author?.socialLinks?.instagram ? (
                    <a
                      href={author.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={18} className="text-pink-600" />
                    </a>
                  ) : (
                    <>
                      <div className="relative p-2 border cursor-pointer rounded-full hover:bg-sky-50 w-fit">
                        <Link href = "/"><FaInstagram size={25} className="text-pink-500" /></Link>
                        <FaPlus
                          className="absolute text-gray-600 text-md font-medium p-[2px]"
                          style={{ top: "-4%", right: "-4%" }}
                        />
                      </div>
                    </>
                  )}
                  {author?.socialLinks?.facebook ? (
                    <a
                      href={author.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
                      aria-label="Facebook"
                    >
                      <FaFacebook size={25} className="text-blue-800" />
                    </a>
                  ) : (
                    <>
                      <div className="relative cursor-pointer p-2 border rounded-full w-fit hover:bg-sky-50">
                        <Link href="/"><FaFacebook size={25} className="text-blue-800" /></Link>
                        <FaPlus
                          className="absolute text-gray-600 text-md font-medium p-[2px]"
                          style={{ top: "-4%", right: "-4%" }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
  
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Featured Content
                </h2>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  View all posts <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {featured.map((post : any , i : number) => (
                  <Link
                    href={`/article/${post?._id}`}
                    key={i}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <Image
                        src={urlFor(post?.mainImage).url()}
                        height={100}
                        width={100}
                        alt="cover"
                        className="w-full h-full object-cover "
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 line-clamp-2">
                        {post?.title}
                      </h3>
                      <span className=" text-gray-500 line-clamp-2">
                        {post?.excerpt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    
  } catch (error) {
    if (error instanceof SanityError && error.status === 404) {
      notFound();
    }
    
    throw error;
  }

};

export default page;