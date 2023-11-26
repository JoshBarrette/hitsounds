"use client";

import { api } from "~/trpc/react";

export default function Test() {
    const sounds = api.search.search.useQuery().data;
    
    return (
        <div>
            {sounds?.at(0)?.title ?? null}
        </div>
    )
}
