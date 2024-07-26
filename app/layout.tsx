import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/ReactToastify.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Account App",
  description:
    "This is an account app generated with Next.js, TypeScript, Tailwind, and Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
