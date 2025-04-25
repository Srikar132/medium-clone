"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from "react";
import { Search } from "lucide-react";

// 1. Context Setup
interface SearchDialogContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}
const SearchDialogContext = createContext<SearchDialogContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export const useSearchDialog = () => useContext(SearchDialogContext);

// 2. Provider
export const SearchDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <SearchDialogContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SearchDialogContext.Provider>
  );
};

export const SearchToggleButton = () => {
  const { toggle } = useSearchDialog();

  return (
    <button
      onClick={toggle}
      className="bg-transparent rounded-full dark:bg-transparent  hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer p-2"
    >
      <Search size={30} className="text-black dark:text-white" />
    </button>
  );
};

export const SearchDialog = ({ children }: { children: ReactNode }) => {
  const { isOpen, close } = useSearchDialog();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        searchRef.current &&
        !(searchRef.current as any).contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
      )}
      <div
        ref={searchRef}
        className={`fixed top-0 left-0 right-0 z-50 dark:bg-secondary-dark bg-white w-full h-[50vh] p-2 sm:p-6 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {children}
      </div>
    </>
  );
};

