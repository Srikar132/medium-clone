"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Comments from "../Comments";
import { MessageCircle, X } from "lucide-react";
import ShareButton from "../ShareButton";
import ArticleInfo from "./ArticleInfo";

const ArticleSheet = ({
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
  const containerRef = useRef(null);

  
  useGSAP(() => {
    gsap.fromTo(
      sheetRef.current,
      { y: "5%", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  
  const handleBack = () => {
   
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => router.back()
    });
  };

 
  const toggleSidebar = () => {
    setOpenComments((prev) => !prev);
  };

  
  useEffect(() => {
    if (!sidebarRef.current) return;

    if (openComments) {
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%", opacity: 0, display: "block" },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(sidebarRef.current, { display: "none" });
        },
      });
    }
  }, [openComments]);

  return (
    <div 
      ref={containerRef} 
      className="bg-black/60 backdrop-blur-sm relative min-h-screen overflow-auto flex"
    >
      
      <button 
        onClick={handleBack}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800/50 backdrop-blur-md text-white hover:bg-gray-700/60 transition-colors"
        aria-label="Close article"
      >
        <X className="w-5 h-5" />
      </button>

      
      <div
        ref={sheetRef}
        className="w-full min-h-screen bg-white dark:bg-zinc-950 flex relative overflow-hidden"
      >
       
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {children}
        </div>

        
        <div className="hidden lg:flex flex-col gap-3 p-3 sticky top-20 mr-4 self-start">
          <button
            onClick={toggleSidebar}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-2 border border-gray-200 dark:border-gray-700 transition-colors"
            aria-label={openComments ? "Close comments" : "Open comments"}
          >
            {openComments ? (
              <X className="w-5 h-5" />
            ) : (
              <MessageCircle className="w-5 h-5" />
            )}
          </button>
          
          {!openComments && (
            <div className="flex flex-col gap-3">
              <ShareButton id={id} />
              <ArticleInfo id={id}/>
            </div>
          )}
        </div>

        
        <aside
          ref={sidebarRef}
          className="fixed inset-y-0 right-0 z-40 bg-white dark:bg-zinc-900 
                    w-full md:w-96 lg:w-[27rem] lg:relative shadow-xl"
          style={{ display: "none" }}
        > 
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-lg">Comments</h2>
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-auto">
              {openComments && <Comments id={id} />}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleSheet;