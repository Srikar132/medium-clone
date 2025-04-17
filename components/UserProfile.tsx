'use client';

import { Session } from 'next-auth';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { menuItems } from '@/constants';
import gsap from 'gsap';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';

const UserProfile = ({ session }: { session: Session | null }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openDialog) {
      gsap.to('#dialog', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenDialog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDialog]);

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        onClick={() => setOpenDialog((prev) => !prev)}
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-pink-500 transition"
      >
        <Image
          src={session?.user?.image as string}
          alt="User Avatar"
          className="w-full h-full object-cover"
          height={10}
          width={10}
        />
      </button>

      {openDialog && (
        <div
          ref={dialogRef}
          id="dialog"
          className="absolute top-full right-0 mt-2 w-56 p-3 rounded-xl bg-white shadow-lg border border-gray-200 opacity-0 -translate-y-4 z-50"
        >
          <ul className="flex flex-col gap-2">
              <Link
                href={`/article/write`}
                key={"Write Article"}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition lg:hidden mb-1"
                onClick={() => setOpenDialog(false)}
              >
                <FaPencilAlt className="text-gray-600 text-sm" />
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {"Write"}
                </span>
              </Link>

               <hr className='bg-black/50'/>
              <Link
                href={`/profile/${session?.id}`}
                key={"My Profile"}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => setOpenDialog(false)}
              >
                <FaUser className="text-gray-600 text-sm" />
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {"My Profile"}
                </span>
              </Link>
              {menuItems.map(({ title, url, Icon }) => (
                <Link
                  href={url}
                  key={title}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setOpenDialog(false)}
                >
                  <Icon className="text-gray-600 text-sm" />
                  <span className="text-sm font-medium text-gray-800 capitalize">
                    {title}
                  </span>
                </Link>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
