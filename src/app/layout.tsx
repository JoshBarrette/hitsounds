import "~/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { URLProvider } from "./_components/URLContext";
import { getBaseUrl } from "~/trpc/shared";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
    title: "hitsounds",
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
                <ClerkProvider>
                    <TRPCReactProvider cookies={cookies().toString()}>
                        <URLProvider url={getBaseUrl()}>{children}</URLProvider>
                    </TRPCReactProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
