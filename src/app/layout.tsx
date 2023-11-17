import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "~/app/_trpc/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hitsounds",
  description: "TF2 Hitsounds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
