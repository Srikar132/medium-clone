import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  return (
    <header className="w-full">
      <div className="nav_cont !py-5">
        <Link className='gap-5 w-[12rem] items-center flex ' href={"/home"}>
          <span className="font-cursive text-2xl font-bold text-black ">Medium</span>
        </Link> 

        
      </div>
    </header>
  )
}

export default Navbar;