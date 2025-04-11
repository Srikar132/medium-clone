import Link from "next/link";
import UserProfile from "./UserProfile";
import { auth, signOut } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import { PiPencilFill } from "react-icons/pi";

const Navbar = async () => {

  const session = await auth();

  return (
    <header className="w-full">
      <div className="nav_cont !py-2 !lg:py-5">
        <Link className='gap-5  items-center flex ' href={"/home"}>
          <span className="font-cursive dark:text-white text-xl lg:text-2xl font-bold text-black ">Medium</span>
        </Link> 


        {/* <nav className="border w-full"></nav> */}
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle/>

         <Link href="/write" className="flex items-center gap-2 md:bg-pink-500 dark:text-white lg:text-white text-black   px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white dark:hover:text-black">
            <PiPencilFill />
            <span className="hidden sm:inline">Write</span>
          </Link>
          
          <UserProfile session={session}/>

          
        </div>
      </div>
    </header>
  )
}

export default Navbar;