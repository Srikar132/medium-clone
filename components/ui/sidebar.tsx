"use client";
import { useState, useEffect, createContext, useContext, ReactNode, useRef } from 'react';

// Create a context for the sidebar state
interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

// Provider component to wrap your app with
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const { isOpen, close } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, close]);
  
  return (
    <>
      {/* Overlay that appears when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-accent/50 bg-opacity-50 backdrop-blur-xl z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />
      
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-full max-w-2xl scrollbar  shadow-lg bg-background z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full scrollbar overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;