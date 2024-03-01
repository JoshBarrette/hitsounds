"use client";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { FormEvent, createRef, useState } from "react";
import { useRouter } from "next/navigation";
import SoundsTable from "../_components/SoundsTable";
import { Button } from "~/app/_components/Button";
import { Select, Option } from "~/app/_components/Select";
import PageSelector from "~/app/_components/PageSelector";
import { SoundTypes } from "~/trpc/shared";
import { TextInput } from "~/app/_components/TextInput";

export default function Search() {
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
            soundType: (typeParam ??
                (soundType !== "any" ? soundType : undefined)) as SoundTypes,
        }).data ?? 1;
    const searcher = api.search.search.useQuery({
        title: title ?? keywordsParam,
        soundType: (typeParam ??
            (soundType !== "any" ? soundType : undefined)) as SoundTypes,
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
            <p className="my-4 text-center text-4xl font-medium text-white">
                Search Sounds
            </p>
            <form
                onSubmit={handleFormSubmit}
                className="my-2 space-y-2 text-center text-white"
            >
                <TextInput
                    ref={inputRef}
                    placeholder="search"
                    defaultValue={keywordsParam ?? ""}
                    className="w-96 text-black"
                />
                <label htmlFor="type" className="mx-2">
                    sound type:
                </label>
                <Select
                    id="type"
                    name="type"
                    ref={typeRef}
                    defaultValue={typeParam ?? "any"}
                >
                    <Option value="any">all sounds</Option>
                    <Option value="hit">hitsound</Option>
                    <Option value="kill">killsound</Option>
                </Select>
                <label htmlFor="sortByInput" className="mx-2">
                    sort by:
                </label>
                <Select
                    id="sortByInput"
                    name="sortByInput"
                    ref={sortRef}
                    defaultValue={sortParam ?? "new"}
                >
                    <Option value="new">new</Option>
                    <Option value="old">old</Option>
                    <Option value="az">{"a->z"}</Option>
                    <Option value="za">{"z->a"}</Option>
                </Select>
                <br />
                <Button type="submit" className="mt-4">
                    Search
                </Button>
            </form>
            {searcher !== undefined && searcher.length !== 0 ? (
                <>
                    <div className="flex">
                        <div className="m-auto">
                            <SoundsTable sounds={searcher} />
                        </div>
                    </div>
                    <div className="mt-2 flex w-full">
                        <PageSelector
                            size={pager}
                            setPage={updateURL}
                            currentPage={page ?? 1}
                        />
                    </div>
                </>
            ) : (
                <p className="text-center text-3xl font-medium text-white">
                    No Sounds Found
                </p>
            )}
        </div>
    );
}
