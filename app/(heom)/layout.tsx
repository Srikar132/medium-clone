import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const session = await auth();
    if(!session) redirect("/");

    return (
      <>
        <Navbar/>
        <main className="min-h-screen text-black">
          {children}
        </main>
        <Footer/>
      </>
    )
  };