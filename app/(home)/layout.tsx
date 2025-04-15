import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {



    return (
      <div className="py-3 px-4">
          <ThemeProvider  attribute="class" defaultTheme="system" enableSystem>
            <Navbar/>
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
          <Toaster  position="top-center"/>
      </div>
    )
  };