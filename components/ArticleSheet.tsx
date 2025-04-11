"use client";

import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const ClientWrapper = ({ children, id }: { children: ReactNode; id: string }) => {

  const router = useRouter();

  useGSAP(() => {
    gsap.to("#sheet", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.in"
    });
  }, []);

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="fixed z-10  overflow-y-auto inset-0 bg-black/50 flex flex-col">
      <div className="flex items-center p-4 justify-end">
        <button onClick={() => handleBack()} >
          <IoClose className="text-xl pointer-events-auto text-white cursor-pointer font-bold" />
        </button>
      </div>

      <div 
        id="sheet"
        className="opacity-0 translate-y-2/12 w-full px-5 lg:px-10  bg-white dark:bg-zinc-950 min-h-screen pt-10 relative"
      >
        <div className="container flex flex-col  mx-auto h-full w-full max-w-5xl ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClientWrapper;