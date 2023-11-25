"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "./client";
import superjson from "superjson";
import { getUrl } from "~/server";

export default function Provider({
    children,
    cookies,
}: {
    children: React.ReactNode;
    cookies?: string;
}) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                unstable_httpBatchStreamLink({
                    url: getUrl(),
                    headers() {
                        return {
                            cookie: cookies,
                            "x-trpc-source": "react",
                        };
                    },
                }),
            ],
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
