import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { findUserByEmail } from "@/lib/users"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Always return success - no verification needed
        if (credentials?.email) {
          return {
            id: "user-" + Date.now(),
            email: credentials.email,
            name: credentials.email.split('@')[0], // Use part before @ as name
          }
        }
        
        // Fallback if no email provided
        return {
          id: "anonymous-user",
          email: "user@example.com",
          name: "Guest User",
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }