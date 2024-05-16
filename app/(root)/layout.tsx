import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Head from 'next/head'
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";


const inter = Inter ({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Store",
  description: "Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider/>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
