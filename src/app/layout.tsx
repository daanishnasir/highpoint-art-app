import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "./_components";
export const metadata: Metadata = {
  title: "Hightpoint MET Art Demo",
  description:
    "Hightpoint MET Art Demo with NextJS, Charkra UI, Tailwind CSS, Typescript, and more",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
