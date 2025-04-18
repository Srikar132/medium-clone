import Link from "next/link";
import UserProfile from "./UserProfile";
import { auth, signIn } from "@/auth";
import { PiPencilFill } from "react-icons/pi";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { BsGoogle } from "react-icons/bs";
import SearchForm from "./SearchForm";
import NavSearchFormWrapper from "./NavSearchFormWrapper";
import ThemeToggle from "./ThemeToggle";
import { Search } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="w-full">
      <div className="nav_cont w-full relative !py-2 !lg:py-5 flex items-center gap-10">
        <Link className="gap-5 items-center flex" href="/home">
          <span className="font-cursive dark:text-white text-lg sm:text-2xl font-semibold text-black">
            Medium
          </span>
        </Link>
        

        <NavSearchFormWrapper>
          <SearchForm/>
        </NavSearchFormWrapper>
        
        
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle/>
          <Link
            href="/search"
            className="flex md:hidden items-center gap-2 px-4 py-1 rounded-full  transition-colors duration-500"
          >
            <Search className="text-lg" />
          </Link>
          {session ? (
            <>
            
            <Link
              href="/article/write"
              className="write___link_nav"
            >
              <PiPencilFill className="text-base sm:text-lg" />
              <span className="hidden sm:inline font-medium">Write</span>
            </Link>

              
              <UserProfile session={session} />
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <Button variant="outline" className="flex items-center sm:gap-x-2 gap-x-1">
                  <BsGoogle className="text-pink-500"/>
                  LOGIN
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;