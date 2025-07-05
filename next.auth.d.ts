import NextAuth,{DefaultSession} from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name:string,
      id: string,
      role: string,

    } & DefaultSession["user"];
  }
}