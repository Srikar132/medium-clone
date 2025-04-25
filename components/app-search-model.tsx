"use client";
import { SearchDialog, useSearchDialog } from "@/components/ui/search-model";
import SearchForm from "./SearchForm";
import NavLink from "./ui/nav-link";
import MenuButton from "./MenuButton";

export default function Search() {
  const { isOpen, toggle } = useSearchDialog();
  return (
    <SearchDialog>
      <div className="flex-center w-full h-full">
        <div className="flex-center flex-col gap-3 ">
          <MenuButton toggle={toggle} isOpen={isOpen} />

          <p className="mt-10 text-gray-600 text-lg  dark:text-white font-meduim text-center max-w-xl mx-auto">
            Try and Hit Enter to Search
          </p>

          <div className=" w-full mx-auto max-w-4xl">
            <SearchForm />
          </div>

          <div className="mx-auto flex-center gap-x-5 flex-wrap mt-2">
            <span className="text-xs capitalized text-secondary-dark dark:text-gray-100/50 leading-0 tracking-wider ">
              Popular Searches
            </span>
            <NavLink variant="green" title="Life style" />
            <NavLink variant="pink" title="Robotics" />
            <NavLink variant="blue" title="Deep Learning" />
          </div>
        </div>
      </div>
    </SearchDialog>
  );
}
