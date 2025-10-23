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
      // Agregar datos del usuario al token cuando inicia sesión
      if (user) {
        token.User = user;
      }

      // Actualizar token si se actualiza la sesión
      if (trigger === "update" && session) {
        token.user = { ...token.user, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      // Enviar datos del usuario a la sesión
      session.user = token.user as any;
      
      // Agregar token de acceso a la sesión si está disponible
      if (token.user?.token) {
        session.accessToken = token.user.token;
      }
      
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