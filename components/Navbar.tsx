"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import MenuButton from "./MenuButton";
import NavigationMenu from "./NavigationMenu";
import { usePathname } from "next/navigation";
import { SearchToggleButton } from "./ui/search-model";
import { useSidebar } from "./ui/sidebar";
import { useSession } from "next-auth/react";
import CreatePostButton from "./CreatePostBtn";
import JoinUsbtn from "./JoinUsbtn";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const { isOpen, toggle } = useSidebar();
  const isHomePage = pathname === "/home";
  const isWritePage = pathname.includes("/article/write");

  return (
    <header
      className={`w-full ${isHomePage ? "bg-transparent mt-5" : "dark:bg-secondary-dark max-lg:dark:bg-transparent"}`}
    >
      <div className="flex items-center justify-between w-full mx-auto px-5 sm:px-10 py-2  screen-max-width-1700 gap-y-5 md:gap-0 flex-col lg:flex-row">
        <Link href="/home" className="flex items-center gap-1">
          <Image
            src="/logo.png"
            height={50}
            width={50}
            alt="LOGO"
            className="w-10 h-10"
          />
          <span className="dark:text-white sm:text-3xl poppins-extrabold-italic text-black ">
            Syron
          </span>
        </Link>

        <nav
          className={`${
            isHomePage
              ? "mx-auto bg-white dark:bg-secondary-dark shadow-md rounded-lg"
              : "ml-auto bg-transparent"
          } w-full max-w-3xl py-1 px-2 flex items-center justify-between`}
        >
          <NavigationMenu />
          <div className="flex items-center gap-x-3 max-lg:justify-between max-lg:w-full">
            {!isHomePage &&
              (session ? (
                !isWritePage && <CreatePostButton />
              ) : (
               <JoinUsbtn/>
              ))}

            {!isHomePage && <SearchToggleButton />}

            <div
              className={`${isHomePage ? "lg:w-fit w-full" : "w-fit"} flex items-center justify-between gap-1`}
            >
              <ThemeToggle />
              <MenuButton toggle={toggle} isOpen={isOpen} />
            </div>
          </div>
        </nav>

        {isHomePage &&
          (session ? (
            <CreatePostButton />
          ) : (
            <JoinUsbtn/>
          ))}
      </div>
    </header>
  );
};

export default Navbar;
