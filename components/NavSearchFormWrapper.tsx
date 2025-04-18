'use client';

import { usePathname } from "next/navigation";
import { ReactNode } from "react";


const NavSearchFormWrapper = ({children} : {
    children : ReactNode
}) => {

    const pathname = usePathname();


  return (
    <div
      className={
        pathname.includes("home") || pathname.includes("onboarding") ? "hidden" : "hidden md:block w-full max-w-md flex items-center justify-center"
      }
    >
      {children}
    </div>
  )
}

export default NavSearchFormWrapper