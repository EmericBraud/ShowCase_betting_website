import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protéger toutes les pages sauf la page de connexion et de création de compte
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Vérifie si l'utilisateur accède à une route protégée
    if (pathname.startsWith("/") && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // L'utilisateur est autorisé seulement s'il est authentifié
    },
  }
);

// Configurer les pages et répertoires protégés
export const config = {
  matcher: [
    "/cooker/:path*", // Protéger toutes les routes qui commencent par /cooker/
  ],
};