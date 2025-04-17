"use client";

import SettingTabs from "@/components/SettingTabs";
import { useFetch } from "@/hooks/useFetch";
import { fetchAuthor } from "@/sanity/lib/fetches";
import { Author } from "@/sanity/types";
import Image from "next/image";

const page = () => {
  const { data, isLoading } = useFetch<Author>(fetchAuthor , null);

  return (
    <div className="w-full flex items-center justify-center mt-20">
      {isLoading ? (
        <div className="rounded"></div>
      ) : (
        <div className="py-6 w-full max-w-5xl px-8 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-8 mx-auto">
            <div className="flex items-center gap-4 mb-8">
              {data?.image && (
                <Image
                  src={data?.image}
                  alt="profile"
                  width={64}
                  height={64}
                  className="rounded-full object-cover border border-gray-200"
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data?.name}</h1>
              <p className="text-gray-600">
                Update Your Username and manage your account
              </p>
            </div>
          </div>

          <SettingTabs data={data} />
        </div>
      )}
    </div>
  );
};

export default page;
