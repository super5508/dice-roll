import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Header } from "@/components/Header";
import { DefaultLayout } from "@/layouts/Default";

import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dice Roller",
  description: "Amazing Dice Roller is here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-surfaces-100`}>
        <Header />
        <main className="pb-6 min-h-[calc(100vh-68px)] flex flex-col">
          <DefaultLayout>{children}</DefaultLayout>
        </main>
      </body>
    </html>
  );
}
