"use client";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import SoundPlayer from "../_components/SoundPlayer";
import { FormEvent, createRef, useState } from "react";
import { useRouter } from "next/navigation";
import SoundPlayerHeader from "../_components/SoundPlayerHeader";

export default function Search(props: { url: string }) {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [soundType, setSoundType] = useState<string | undefined>(undefined);
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams();
    const router = useRouter();
    const keywords = searchParams.get("keywords");
    const inputRef = createRef<HTMLInputElement>();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();
    const searcher = api.search.search.useQuery({
        title: title ?? keywords,
        soundType: soundType !== "any" ? soundType : undefined,
        sortBy: sortBy ?? "new",
    }).data;

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTitle(inputRef.current?.value);
        setSoundType(typeRef.current?.value);
        setSortBy(sortRef.current?.value);

        const keywordsString =
            inputRef.current?.value !== ""
                ? `keywords=${inputRef.current?.value}`
                : null;
        const soundTypeString =
            typeRef.current?.value !== "any"
                ? `&type=${typeRef.current?.value}`
                : null;
        const sortString =
            sortRef.current?.value !== "new"
                ? `&sortBy=${sortRef.current?.value}`
                : null;

        router.push(
            `/Search${
                keywordsString || soundTypeString || sortString ? "?" : ""
            }` +
                `${keywordsString ?? ""}${soundTypeString ?? ""}` +
                `${sortString ?? ""}`
        );
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
                <label htmlFor="type" className="ml-2">sound type:</label>
                <select
                    id="type"
                    name="type"
                    className="text-md mx-2 my-auto w-28 rounded-md border-2 border-cyan-100 bg-gray-700 p-1 font-sans font-medium text-white focus:border-2 focus:border-blue-400 focus:ring-blue-400"
                    ref={typeRef}
                >
                    <option value="any" className="font-sans font-medium">
                        all sounds
                    </option>
                    <option value="hit" className="font-sans font-medium">
                        hitsound
                    </option>
                    <option value="kill" className="font-sans font-medium">
                        killsound
                    </option>
                </select>
                <label htmlFor="sortByInput" className="mr-2">sort by:</label>
                <select
                    id="sortByInput"
                    name="sortByInput"
                    className="text-md my-auto mr-2 w-24 rounded-md border-2 border-cyan-100 bg-gray-700 p-1 font-sans font-medium text-white focus:border-2 focus:border-blue-400 focus:ring-blue-400"
                    ref={sortRef}
                >
                    <option value="new" className="font-sans font-medium">
                        new
                    </option>
                    <option value="old" className="font-sans font-medium">
                        old
                    </option>
                    <option value="az" className="font-sans font-medium">
                        {"a->z"}
                    </option>
                    <option value="za" className="font-sans font-medium">
                        {"z->a"}
                    </option>
                </select>
                <button
                    type="submit"
                    className="rounded-md bg-red-300 px-3 py-2"
                >
                    Search
                </button>
            </form>
            <div className="flex">
                <div className="m-auto">
                    {(searcher?.length as number) > 0 ? (
                        <SoundPlayerHeader />
                    ) : null}
                    {searcher?.map((sound, key) => {
                        return (
                            <SoundPlayer
                                sound={sound}
                                key={key}
                                url={props.url}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
