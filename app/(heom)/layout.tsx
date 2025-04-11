import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
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
      <div className="py-3 px-4">
          <ThemeProvider  attribute="class" defaultTheme="system" enableSystem>
            <Navbar/>
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
      </div>
    )
  };