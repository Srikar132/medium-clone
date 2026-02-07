"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreatePostButton from "./CreatePostBtn";
import JoinUsbtn from "./JoinUsbtn";
import MenuButton from "./MenuButton";
import NavigationMenu from "./NavigationMenu";
import ThemeToggle from "./ThemeToggle";
import { SearchToggleButton } from "./ui/search-model";
import { useSidebar } from "./ui/sidebar";

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
            InfraInk
          </span>
        </Link>

        <nav
          className={`${
            isHomePage
              ? "mx-auto bg-white dark:bg-secondary-dark shadow-md rounded-full"
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
              className={`${isHomePage ? "lg:w-fit w-full" : "w-fit"} flex items-center justify-between gap-4`}
            >
              <ThemeToggle />

              {/* Show profile avatar if logged in, otherwise show menu button */}
              {session ? (
                <Link
                  href={`/profile/${session.id}`}
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                  aria-label="Open profile"
                >
                  <Image
                    src={session.user?.image || "/default-avatar.jpg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </Link>
              ) : (
                <MenuButton toggle={toggle} isOpen={isOpen} />
              )}
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
