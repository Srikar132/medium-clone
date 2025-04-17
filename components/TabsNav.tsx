'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; // Optional utility for cleaner class handling

type Tab = {
  name: string;
  url: string;
};

type TabsNavProps = {
  tabs: Tab[];
};

export default function TabsNav({ tabs }: TabsNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 border-b pb-2">
      {tabs.map((tab) => (
        <Link
          key={tab.url}
          href={tab.url}
          className={clsx(
            'text-gray-500 hover:text-gray-900 transition-colors font-medium',
            pathname === tab.url && 'text-pink-500 border-b-2 border-pink-500 pb-1'
          )}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}
