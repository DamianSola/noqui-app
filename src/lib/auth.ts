import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from './axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Login con tu backend usando Axios
          const { data: user } = await axiosInstance.post('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (user) {
            return user;
          }
          
          return null;
        } catch (error: any) {
          console.error("Auth error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user, trigger, session }) {
    // Solo se ejecuta en el login inicial (user viene populado)
    if (user) {
      const payload = user as any; // tipado según tu respuesta de API

      token.accessToken = payload.data.token;
      token.user = payload.data.user; // { id, email, name, role }
    }

    // Actualizar si se dispara session.update()
    if (trigger === "update" && session) {
      token.user = { ...token.user, ...session };
    }

    return token;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken as string;
    session.user = token.user as any; // { id, email, name, role }

    return session;
  },
},
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};