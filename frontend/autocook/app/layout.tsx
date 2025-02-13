// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";  // Assurez-vous que c'est bien un composant côté client

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-backgrd font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flounex flex-col h-screen">
            <Navbar />
            <main className="dark container mx-auto pt-6 px-6 flex-grow pb-20 h-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
