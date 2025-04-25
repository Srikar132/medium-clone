import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_EMAIL_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile) {

        

        const existingAuthor = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_EMAIL_ID, {id: user.email});

        if (!existingAuthor) {
          const author = await writeClient.create({
            _type: "author",
            googleId: "google-id",
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.email?.split('@')[0] || 'user',
            bio: '',
            memberSince : new Date().toISOString()
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

        
        if (user.email) {
          const author = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_EMAIL_ID, {id: user.email});
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