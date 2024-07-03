import QueryProvider from "@/app/_components/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

type Props = { children: ReactNode; modal: ReactNode };

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감 - 모든 포켓몬 정보를 한눈에?~!",
  description: "포켓몬 도감 사이트에서 모든 포켓몬의 정보를 찾아보세요.",
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative">
        <div className="fixed inset-0 bg-home-background bg-cover bg-center opacity-50 z-0"></div>
        <div className="relative z-10">
          <QueryProvider>
            <div>{children}</div>
            <div> {modal}</div>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
