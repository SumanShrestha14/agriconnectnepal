import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectToDatabase } from "./db";
import Customer from "@/models/Customer";
import bcrypt from "bcryptjs";
import Farmer from "@/models/Farmer";

export const AuthOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectToDatabase();

          let user = await Farmer.findOne({ email });
          let role = "farmer";

          if (!user) {
            user = await Customer.findOne({ email });
            role = "customer";
          }

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            name: user.fullName || user.fullname || user.name || "",
            email: user.email,
            role: role,
          };
        } catch (error) {
          console.error("Error in authorization:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role = typeof token.role === "string" ? token.role : "";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 25 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
