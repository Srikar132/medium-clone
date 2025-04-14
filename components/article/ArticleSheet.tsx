"use client";

import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Comments from "../Comments";
import { ArrowLeft, MessageCircle, X } from "lucide-react";
import ShareButton from "../ShareButton";
import ArticleInfo from "./ArticleInfo";

const ClientWrapper = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const router = useRouter();
  const [openComments, setOpenComments] = useState(false);
  const sidebarRef = useRef(null);
  const sheetRef = useRef(null);

  useGSAP(() => {
    gsap.to(sheetRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.in",
    });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const toggleSidebar = () => {
    setOpenComments((prev) => !prev);
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    if (openComments) {
      gsap.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.in",
        display: "block",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(sidebarRef.current, { display: "none" });
        },
      });
    }
  }, [openComments]);

  return (
    <div className="bg-black/50 relative min-h-screen overflow-auto">
      <div className="absolute lg:static top-0 right-0 z-[200] p-2">
        <button onClick={handleBack}>
          <IoClose className="text-xl text-white cursor-pointer font-bold" />
        </button>
      </div>

      <div
        ref={sheetRef}
        id="sheet"
        className="opacity-0 translate-y-2/12 w-full min-h-screen bg-white dark:bg-zinc-950 lg:pt-10 flex"
      >
        {children}

        <div className="hidden lg:flex flex-col gap-2 p-2 lg:mt-1">
          <button
            onClick={toggleSidebar}
            className="rounded-full hover:bg-gray-100 cursor-pointer p-1 border "
          >
            {openComments ? (
              <X className="w-4 h-4 text-black" />
            ) : (
              <MessageCircle className="w-4 h-4 text-black" />
            )}
          </button>
          {!openComments && (
            <>
              <ShareButton />
              <ArticleInfo />
            </>
          )}
        </div>

        <aside
          ref={sidebarRef}
          className={`
            fixed inset-0 z-50 bg-white dark:bg-zinc-900 
            w-full  h-full
            lg:relative lg:translate-x-full lg:w-[24rem] lg:h-screen
          `}
          style={{ display: "none" }}
        >
          <div className="w-full h-full relative">
            <div className="lg:hidden absolute top-4 left-4">
              <button onClick={toggleSidebar}>
                <ArrowLeft className="text-2xl text-black dark:text-white" />
              </button>
            </div>
            {openComments && <Comments id={id} />}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ClientWrapper;
