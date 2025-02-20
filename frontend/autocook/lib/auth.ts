import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true, // Assure-toi de récupérer le mot de passe pour la comparaison
            isAdmin: true, // Récupère aussi isAdmin
          },
        });

        if (
          !user ||
          !(await compare(credentials.password, user.password ?? ""))
        ) {
          return null;
        }

        // Retourner isAdmin avec les autres informations de l'utilisateur
        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin, // Inclure isAdmin ici
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin, // Inclure isAdmin ici
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          isAdmin: user.isAdmin, // Inclure isAdmin ici
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/signup",
  },
};
