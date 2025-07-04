import CredentialsProvider  from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const AuthOption:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string };
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                try{
                    await connectToDatabase();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const isValid = await bcrypt.compare(password, user.password) 

                    if (!isValid) {
                        throw new Error("Invalid credentials");
                    }
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    };
                }
                catch (error) { 
                    console.error("Error in authorization:", error);
                    throw new Error("Authorization failed");
                }   
            },

        }),
        

    ],
    callbacks:{
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },

    pages:{
        signIn : "/login",
        error : "/login"
    },
    session:{
        strategy : "jwt",
        maxAge : 30*25*60*60,
    },
    secret : process.env.NEXTAUTH_SECRET,

}
