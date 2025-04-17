"use client";

import React, { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getArticleInformation} from "@/sanity/lib/fetches";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "../WritePageSkeleton";

interface InfoButtonProps {
  id: string;
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current : string
  }
}

interface InfoProps {
  _id: string;
  views: number;
  likesCount: number;
  bookmarkCount: number;
  commentsCount: number;
  publishedAt: string;
  categories: Category[];
}

const ArticleInfo: React.FC<InfoButtonProps> = ({ id }) => {
  const [data, setData] = useState<InfoProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      const data = await getArticleInformation(id);
      setData(data as InfoProps);
      setIsLoading(false);
    };

    if(id) getInfo();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full p-2 border hover:bg-gray-100 cursor-pointer">
          <InfoIcon className="w-5 h-5 text-black font-thin" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Shot Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col space-y-4 py-4">
            <Skeleton className="h-4 w-[150px]" /> {/* Published date */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="h-14 w-24 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-6 w-[120px]" /> {/* Categories title */}
            <div className="mt-4 flex space-x-3 flex-wrap">
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-md" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published{" "}
              {data?.publishedAt &&
                format(new Date(data.publishedAt), "MMMM, yyyy")}
            </p>

            <div className="flex items-center space-x-2">
              <DD title="Views" value={data?.views ?? 0} />
              <DD title="Likes" value={data?.likesCount ?? 0} />
              <DD title="Saves" value={data?.bookmarkCount ?? 0} />
              <DD title="Comments" value={data?.commentsCount ?? 0} />
            </div>

            <h1 className="mt-3 text-xl font-semibold">Categories</h1>
            <div className="mt-4 flex space-x-3 flex-wrap">
              {data?.categories?.map((category) => (
                <Link
                  key={category._id}
                  href={`/home/categories/${category.slug.current}`}
                >
                  <Button size="sm" variant="outline" className="flex-1">
                    {category.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleInfo;

const DD = ({ title, value }: { title: string; value: string | number }) => (
  <div className="flex flex-col space-y-2 p-2">
    <h5 className="font-semibold text-lg">{title}</h5>
    <span className="font-thin text-xl">{value}</span>
  </div>
);
