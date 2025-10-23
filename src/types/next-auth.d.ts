// // types/next-auth.d.ts
// import NextAuth from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     backendToken: string
//     refreshToken: string
//     user: {
//       id: string
//       email: string
//       name: string
//     } & DefaultSession["user"]
//   }

//   interface User {
//     id: string
//     email: string
//     name: string
//     token: string
//     refreshToken: string
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     backendToken: string
//     refreshToken: string
//     id: string
//   }
// }

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      token?: string;
      email?: string;
      name?: string;
    } & DefaultSession["user"];
    accessToken: string
  }

  interface User extends DefaultUser {
    id?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id?: string;
      token?: string;
      email?: string;
      name?: string;
    };
  }
}
