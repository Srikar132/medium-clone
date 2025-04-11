import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile) {

        const googleId : string | undefined= user.id || account?.providerAccountId;
        
        if (!googleId) {
          console.error("Failed to get Google ID");
          return false;
        }

        const existingAuthor = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GOOGLE_ID, {id: googleId});

        if (!existingAuthor) {
          const author = await writeClient.create({
            _type: "author",
            googleId: googleId,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.email?.split('@')[0] || 'user',
            bio: ''
          });
          console.log("Author Created : ",author._id);
        }
      } else {
        console.error("Google profile is undefined");
        return false;
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {

        const googleId = user.id || account?.providerAccountId;
        
        if (googleId) {
          const author = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GOOGLE_ID, {id: googleId});
          if (author?._id) {
            token.id = author._id;
          }
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