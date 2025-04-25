import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { SMProvider } from "@/components/ui/__ms__";
import MediumFooter from "@/components/MediumFooter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppSearchModel from "@/components/app-search-model";
import { SearchDialogProvider} from "@/components/ui/search-model";

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
              <MediumFooter />
              <Toaster position="top-center" />
              <SMProvider />
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </SearchDialogProvider>
    </SidebarProvider>
  );
}
