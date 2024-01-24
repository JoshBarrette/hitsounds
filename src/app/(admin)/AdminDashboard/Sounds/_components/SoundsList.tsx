"use client";
import { api } from "~/trpc/react";
import AdminSoundsTable from "./AdminSoundsTable";
import SoundViewer from "./SoundViewer";
import { FormEvent, createRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Select } from "~/app/_components/Select";
import { Button } from "~/app/_components/Button";

export default function SoundsList(props: { url: string }) {
    const inputRef = createRef<HTMLInputElement>();
    const uploaderRef = createRef<HTMLInputElement>();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();

    const [title, setTitle] = useState<string | undefined>(
        inputRef.current?.value ?? undefined
    );
    const [soundType, setSoundType] = useState<string | undefined>(
        typeRef.current?.value ?? undefined
    );
    const [sortBy, setSortBy] = useState<string>(
        sortRef.current?.value ?? "new"
    );
    const [uploader, setUploader] = useState<string | undefined>(
        uploaderRef.current?.value ?? undefined
    );
    const [page, setPage] = useState<number>(1);
    const s = api.admin.search.useQuery({
        title,
        sortBy,
        soundType,
        page,
        uploader,
    });
    const p = api.admin.searchPageCount.useQuery({
        title,
        soundType,
        uploader,
    });

    const searchParams = useSearchParams();
    const soundIDParam = parseInt(searchParams.get("s") ?? "-1");
    const [currentSoundID, setCurrentSoundID] = useState(soundIDParam);
    const currentSound = api.admin.getSingleSound.useQuery(currentSoundID);

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setTitle(inputRef.current?.value);
        setSoundType(typeRef.current?.value);
        setSortBy(sortRef.current?.value ?? "new");
        setUploader(uploaderRef.current?.value);
    }

    return (
        <div className="flex h-full flex-col items-center text-white">
            <form onSubmit={handleFormSubmit} className="my-2 text-center">
                <div className="mb-2 flex space-x-2">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="title"
                        className="w-96 rounded-sm bg-cyan-900 text-center leading-8 placeholder:text-neutral-200"
                    />
                    <input
                        type="text"
                        ref={uploaderRef}
                        placeholder="userID"
                        className="w-96 rounded-sm bg-cyan-900 text-center leading-8 placeholder:text-neutral-200"
                    />
                </div>
                <label htmlFor="type" className="mr-2">
                    sound type:
                </label>
                <Select
                    id="type"
                    name="type"
                    ref={typeRef}
                    defaultValue={"any"}
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
                </Select>
                <label htmlFor="sortByInput" className="mr-2">
                    sort by:
                </label>
                <Select
                    id="sortByInput"
                    name="sortByInput"
                    ref={sortRef}
                    defaultValue={"new"}
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
                </Select>
                <br />
                <Button type="submit" className="mt-2">
                    Filter
                </Button>
            </form>

            {s.data ? (
                <div className="flex h-full w-full">
                    <div className="flex-1">
                        <AdminSoundsTable
                            url={props.url}
                            sounds={s.data}
                            setCurrentSoundID={setCurrentSoundID}
                            totalPages={p.data ?? 0}
                            setPage={setPage}
                            currentPage={page}
                        />
                    </div>

                    <div className="h-full flex-1">
                        {currentSound.isSuccess ? (
                            <SoundViewer
                                sound={currentSound.data}
                                refreshSounds={() => {
                                    s.refetch();
                                    setCurrentSoundID(s.data![0].id);
                                }}
                            />
                        ) : null}
                    </div>
                </div>
            ) : (
                <p className="text-3xl font-medium">
                    {s.isLoading ? "Loading..." : "No Sounds Found"}
                </p>
            )}
        </div>
    );
}
