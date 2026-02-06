import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_EMAIL_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile && user.email) {
        try {
          // Check if user exists and create if needed
          const existingAuthor = await client.fetch(AUTHOR_BY_EMAIL_ID, {id: user.email});

          if (!existingAuthor) {
            const author = await writeClient.create({
              _type: "author",
              googleId: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              username: user.email?.split('@')[0] || 'user',
              bio: '',
              memberSince : new Date().toISOString()
            });
            console.log("New author created:", author._id);
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }

      return false;
    },
    async jwt({ token, account, user }) {
      // Only fetch user data on initial sign in, not on every token refresh
      if (account && user?.email) {
        try {
          const author = await client.fetch(AUTHOR_BY_EMAIL_ID, {id: user.email});
          if (author?._id) {
            token.id = author._id;
            token.email = user.email;
          }
        } catch (error) {
          console.error("Error fetching author in JWT:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.id = token.id as string;
      }
      return session;
    }
  }
});
