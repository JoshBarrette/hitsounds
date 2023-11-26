"use client";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import SoundPlayer from "../_components/SoundPlayer";
import { FormEvent, createRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams();
    const router = useRouter();
    const keywords = searchParams.get("keywords");
    const inputRef = createRef<HTMLInputElement>();
    const searcher = api.search.search.useQuery({
        title: title ?? keywords,
    }).data;

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTitle(inputRef.current?.value);
        router.push(`/Search?keywords=${inputRef.current?.value}`);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="mt-1 text-center">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="...search"
                    defaultValue={keywords ?? ""}
                    className="mb-2 w-96 rounded-sm bg-blue-300 text-center leading-8 text-black placeholder:text-neutral-500"
                />
                <button
                    type="submit"
                    className="ml-2 rounded-md bg-red-300 px-3 py-2"
                >
                    Search
                </button>
            </form>
            <div className="flex">
                <div className="m-auto">
                    {searcher?.map((sound, key) => {
                        return <SoundPlayer sound={sound} key={key} />;
                    })}
                </div>
            </div>
        </div>
    );
}
