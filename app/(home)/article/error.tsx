"use client";

import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl text-center">
        <Image
          height={100}
          width={100}
          src="/delete-sad.jpg"
          alt="Not found"
          className="mx-auto w-48 mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
        <p className="text-gray-600 mb-6">
          The article you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
          <Link href={"/home"} className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all">
            Go back home
          </Link>
      </div>
    </div>
  );
}
