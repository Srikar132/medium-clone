import Link from "next/link";
import UserProfile from "./UserProfile";
import { auth, signIn } from "@/auth"; // signIn from auth.js@beta
import ThemeToggle from "./ThemeToggle";
import { PiPencilFill } from "react-icons/pi";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { BsGoogle } from "react-icons/bs";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="w-full">
      <div className="nav_cont !py-2 !lg:py-5 flex items-center">
        <Link className="gap-5 items-center flex" href="/home">
          <span className="font-cursive dark:text-white text-2xl font-semibold text-black">
            Medium
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/article/write"
                className="flex max-lg:hidden items-center gap-2 px-4 py-1 rounded-full text-black/50 hover:text-black transition-colors duration-500"
              >
                <PiPencilFill className="text-lg" />
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
                <Button variant="outline" className="flex items-center gap-x-2">
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
