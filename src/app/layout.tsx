import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice Nextjs App",
  description: "A small practice app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="p-1 px-10 bg-[#f5f5f5] justify-between flex">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
