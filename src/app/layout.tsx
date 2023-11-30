import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import SiteHeader from "./_components/SiteHeader";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "...hitsounds",
    description: "TF2 Hitsounds",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClerkProvider
                    appearance={{
                        baseTheme: dark,
                        signIn: { baseTheme: dark },
                    }}
                >
                    <TRPCReactProvider cookies={cookies().toString()}>
                        <SiteHeader />
                        {children}
                    </TRPCReactProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
