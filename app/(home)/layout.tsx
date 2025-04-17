import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "@/components/ui/sonner"
import { SMProvider } from "@/components/ui/__ms__";
import MediumFooter from "@/components/MediumFooter";

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
            <MediumFooter/>
          </ThemeProvider>
          <Toaster  position="top-center"/>
          <SMProvider/>
      </div>
    )
  };