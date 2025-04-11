// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string; // The custom field added to the session
  }

  interface JWT {
    id: string; // The custom field added to the JWT token
  }
}
