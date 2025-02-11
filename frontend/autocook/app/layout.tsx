// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
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
    icon: "/favicon.ico",
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
            <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow pb-20">
              {children}
            </main>
            <footer className="fixed bottom-0 w-full flex items-center justify-center py-3 bg-foreground-50 boxShadowTop">
              <ul className="flex justify-center space-x-20">
                {siteConfig.footerNavMenuItems.map((item, index) => (
                  <li className="flex-auto" key={index}>
                    <Link href={item.href} className='text-forground-50'>
                      {item.label === "Groups" && (
                        <svg width="34" height="34" fill="currentColor" viewBox="0 0 16 16" className="dropShadow">
                          <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                          <path d="M14 11V2h1v9zM6 3v10H5V3z" />
                          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                        </svg>
                      )}
                      {item.label === "Shopping List" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor" className="dropShadow">

                          <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        
                        </svg>
                      )}
                      {item.label === "Planning" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor" className="dropShadow">

                        <path d={item.iconPath} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      
                      </svg>
                      )}
                      
                      {(item.label !== "Shopping List") && (item.label !== "Groups") && (item.label !=="Planning")&&(
                        <svg width="34" height="34" fill="currentColor" viewBox="0 0 16 16" className="dropShadow">
                          <path d={item.iconPath} />
                        </svg>

                      )}
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
