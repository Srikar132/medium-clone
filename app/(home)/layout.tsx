import AppSearchModel from "@/components/app-search-model";
import AppSidebar from "@/components/app-sidebar";
import InfraInkFooter from "@/components/MediumFooter";
import Navbar from "@/components/Navbar";
import { SMProvider } from "@/components/ui/__ms__";
import { SearchDialogProvider } from "@/components/ui/search-model";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SearchDialogProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <AppSidebar />
            <AppSearchModel/>
            <main className="relative flex flex-col items-center justify-center w-full ">
              <Navbar />
              <div className="w-full screen-max-width-1700  px-5 w-full sm:px-10">
                {children}
              </div>
              <InfraInkFooter />
              <Toaster position="top-center" />
              <SMProvider />
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </SearchDialogProvider>
    </SidebarProvider>
  );
}
