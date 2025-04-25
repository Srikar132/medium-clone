import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex flex-col items-center justify-center  mx-auto  bg-gradient-to-b from-white to-gray-50">
      <div className="w-full">
        {children}
      </div>
    </main>
  )
};