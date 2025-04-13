import { auth } from "@/auth";
import ProfileTabs from "@/components/ProfileTabs";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  
  const id = (await params)?.id;

  const author = await client.fetch(AUTHOR_BY_ID, { id });

  if (!author) notFound();

  return (
    <>
      <div className="w-full h-screen p-5 lg:p-10">

        <div className="w-full mx-auto max-w-3xl flex flex-col items-center justify-center p-2 sm:p-5 md:p-6 lg:p-7">
          <div className="flex w-full max-w-md items-center  gap-2">
            <Image
              className="w-20 h-20 rounded-full overflow-hidden"
              height={20}
              width={20}
              src={author?.image}
              alt="p"
            />
            <div className="flex flex-col  justify-baseline items-start">
              <span className="text-4xl  font-black font-bold tracking-wider capitalize">
                {author?.name}
              </span>
              <span className="text-sm capitalize ">@{author?.username}</span>
            </div>

          </div>

          <div className="flex  items-center gap-3 mt-5">
            <button className="rounded-full border px-4 py-1 text-black hover:bg-gray-100">edit profile</button>
            <button className="rounded-full cursor-pointer p-1  ">
                <BsThreeDots />
            </button>

          </div>
        </div>


        <ProfileTabs authorId={id} />


        {children}

      </div>
    </>
  );
}
