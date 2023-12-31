"use client";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import SoundPlayer from "../_components/SoundPlayer";
import { FormEvent, createRef, useState } from "react";
import { useRouter } from "next/navigation";
import SoundPlayerHeader from "../_components/SoundPlayerHeader";
import { DefaultButtonStyles } from "../_components/Constants";

export default function Search(props: { url: string }) {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [soundType, setSoundType] = useState<string | undefined>(undefined);
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number | undefined>(undefined);
    const searchParams = useSearchParams();
    const router = useRouter();
    const keywordsParam = searchParams.get("k");
    const typeParam = searchParams.get("type");
    const sortParam = searchParams.get("sortBy");
    const pageParam = searchParams.get("p");
    const inputRef = createRef<HTMLInputElement>();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();
    const pager =
        api.search.searchPageCount.useQuery({
            title: title ?? keywordsParam,
            soundType:
                typeParam ?? (soundType !== "any" ? soundType : undefined),
        }).data ?? 1;
    const searcher = api.search.search.useQuery({
        title: title ?? keywordsParam,
        soundType: typeParam ?? (soundType !== "any" ? soundType : undefined),
        sortBy: sortBy ?? sortParam ?? "new",
        page: page ?? (pageParam !== null ? parseInt(pageParam) : undefined),
    }).data;

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateURL();
    }

    function updateURL(newPage?: number) {
        setTitle(inputRef.current?.value);
        setSoundType(typeRef.current?.value);
        setSortBy(sortRef.current?.value);
        if (newPage !== undefined) setPage(newPage);

        const keywordsString =
            inputRef.current?.value !== ""
                ? `k=${inputRef.current?.value}`
                : null;
        const pageString =
            newPage !== undefined
                ? `&p=${newPage}`
                : page !== undefined
                  ? `&p=${page}`
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
                keywordsString || soundTypeString || sortString || pageString
                    ? "?"
                    : ""
            }` +
                `${keywordsString ?? ""}${soundTypeString ?? ""}` +
                `${sortString ?? ""}${pageString ?? ""}`
        );
    }

    return (
        <div className="min-h-screen">
            <form
                onSubmit={handleFormSubmit}
                className="my-2 text-center text-white"
            >
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="search"
                    defaultValue={keywordsParam ?? ""}
                    className="w-96 rounded-sm bg-cyan-900 text-center leading-8 text-white placeholder:text-neutral-200"
                />
                <label htmlFor="type" className="ml-2">
                    sound type:
                </label>
                <select
                    id="type"
                    name="type"
                    className="text-md mx-2 my-auto w-28 rounded-md bg-cyan-900 p-1 font-sans font-medium"
                    ref={typeRef}
                    defaultValue={typeParam ?? "any"}
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
                <label htmlFor="sortByInput" className="mr-2">
                    sort by:
                </label>
                <select
                    id="sortByInput"
                    name="sortByInput"
                    className="text-md my-auto mr-2 w-24 rounded-md bg-cyan-900 p-1 font-sans font-medium text-white"
                    ref={sortRef}
                    defaultValue={sortParam ?? "new"}
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
                <button type="submit" className={DefaultButtonStyles}>
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
            <div className="mt-2 flex w-full">
                <PageSelector size={pager} callback={updateURL} />
            </div>
        </div>
    );
}

function PageSelector(props: { size: number; callback: (n?: number) => void }) {
    const thingToMapOver = new Array<number>(props.size).fill(1);
    return (
        <div className="m-auto flex">
            {thingToMapOver.map((_, key) => (
                <button
                    className="mx-1 rounded-md bg-cyan-500 px-3 py-1 text-lg transition-all hover:bg-cyan-600 active:bg-cyan-400"
                    key={key}
                    onClick={() => props.callback(key + 1)}
                >
                    {key + 1}
                </button>
            ))}
        </div>
    );
}
