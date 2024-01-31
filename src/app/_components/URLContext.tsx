"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const URLContext = createContext("Site URL");

export function URLProvider(props: { url: string; children: ReactNode }) {
    const [url, setUrl] = useState(props.url);

    return (
        <URLContext.Provider value={url}>{props.children}</URLContext.Provider>
    );
}

export default function useURL() {
    const context = useContext(URLContext);

    if (!context) {
        throw new Error("Called useURL outside of URLProvider");
    }

    return context;
}
