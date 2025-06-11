import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user's email is allowed
      const allowedEmails = [
        "ahmet@fiepilot.com",
        "isa@fiepilot.com",
        "muhammet@fiepilot.com"
      ];
      
      if (allowedEmails.includes(user.email || "")) {
        return true;
      }
      return false; // Reject sign in for other emails
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST }; 