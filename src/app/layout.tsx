import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cookies } from "next/headers";

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
                <ClerkProvider
                    appearance={{
                        baseTheme: dark,
                        signIn: { baseTheme: dark },
                    }}
                >
                    <TRPCReactProvider cookies={cookies().toString()}>
                        <Header />
                        {children}
                    </TRPCReactProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
