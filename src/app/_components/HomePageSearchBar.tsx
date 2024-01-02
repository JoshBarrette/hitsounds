"use client";

import { useRouter } from "next/navigation";
import { createRef } from "react";
import { DefaultButtonStyles } from "./Constants";

export default function HomePageSearchBar() {
    const router = useRouter();
    const inputRef = createRef<HTMLInputElement>();

    return (
        <div className="mx-auto mt-10 w-full">
            <form
                className="mx-auto space-x-3 text-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/Search?q=${inputRef.current?.value ?? ""}`);
                }}
            >
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="search"
                    className="w-3/5 rounded-sm bg-cyan-900 text-center text-xl leading-10 text-white placeholder:text-neutral-200"
                />
                <button type="submit" className={DefaultButtonStyles}>
                    Search
                </button>
            </form>
        </div>
    );
}
