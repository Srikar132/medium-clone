import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Meduim",
  description: "Write , Read , and stay connected with all.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
    <body>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </body>
  </html>  
  );
}

