import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { createServerClientInstance } from "@/utils/supabase/server";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password...",
        },
      },
      async authorize(credentials) {
        const supabase = await createServerClientInstance();

        const { email, password } = credentials;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          throw new Error("Invalid email or password");
        }

        return {
          id: data.user.id,
          email: data.user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  // async redirect({ url, baseUrl }) {
  //   if (url === `${baseUrl}/login`) return `${baseUrl}/main/site/women`;

  //   if (url.startsWith("/")) {
  //     return `${baseUrl}${url}`;
  //   }
  //   return baseUrl;
  // },

  pages: {
    signIn: "/login",
  },
};
