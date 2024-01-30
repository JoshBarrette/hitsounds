"use client";

import { useRouter } from "next/navigation";
import { createRef } from "react";
import { Button } from "~/app/_components/Button";
import { TextInput } from "~/app/_components/TextInput";

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
                <TextInput
                    ref={inputRef}
                    placeholder="search"
                    className="w-1/3 text-xl leading-10"
                />
                <Button type="submit">Search</Button>
            </form>
        </div>
    );
}
