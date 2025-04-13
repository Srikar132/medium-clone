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
    <div className=" bg-black/50 flex flex-col relative h-screen">
      <div className="absolute lg:static top-0 right-0 z-[200] p-2">
        <button onClick={handleBack}>
          <IoClose className="text-xl pointer-events-auto text-white cursor-pointer font-bold" />
        </button>
      </div>
  
      <div
        id="sheet"
        className="opacity-0 translate-y-2/12 w-full h-full overflow-y-auto bg-white dark:bg-zinc-950"
      >
        {children}
      </div>
    </div>
  );
}  

export default ClientWrapper;