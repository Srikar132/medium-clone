// app/profile/[username]/ProfileTabs.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileTabs({ authorId } : {authorId : string}) {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Profile', path: `/profile/${authorId}` },
    { name: 'published', path: `/profile/${authorId}/published` },
    { name: 'responses', path: `/profile/${authorId}/responses` },
    { name: 'settings', path: `/profile/${authorId}/settings` },
  ];
  
  return (
<div className="w-full mx-auto max-w-3xl mt-5 flex items-center gap-4 text-sm">
  {tabs.map(tab => {
    const tabPath = new URL(tab.path, 'http://localhost').pathname;
    const isActive = pathname === tabPath;

    return (
      <Link 
        key={tab.name} 
        href={tab.path}
        className={`px-3  py-2 transition-all duration-200 ${
          isActive 
            ? 'border-b-2 border-pink-500 text-black font-semibold dark:text-white'
            : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
        }`}
      >
        {tab.name}
      </Link>
    );
  })}
</div>

  );
}