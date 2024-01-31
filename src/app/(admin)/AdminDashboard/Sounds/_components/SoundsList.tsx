"use client";
import { api } from "~/trpc/react";
import AdminSoundsTable from "./AdminSoundsTable";
import SoundViewer from "./SoundViewer";
import { FormEvent, createRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Option, Select } from "~/app/_components/Select";
import { Button } from "~/app/_components/Button";
import { SoundTypes } from "~/trpc/shared";
import { TextInput } from "~/app/_components/TextInput";

export default function SoundsList() {
    const inputRef = createRef<HTMLInputElement>();
    const uploaderRef = createRef<HTMLInputElement>();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();

    const [title, setTitle] = useState<string | undefined>(
        inputRef.current?.value ?? undefined
    );
    const [soundType, setSoundType] = useState<SoundTypes>(
        typeRef.current?.value as SoundTypes
    );
    const [sortBy, setSortBy] = useState<string>(
        sortRef.current?.value ?? "new"
    );
    const searchParams = useSearchParams();
    const uploaderIDParam = searchParams.get("u");
    const [uploader, setUploader] = useState<string | undefined>(
        uploaderIDParam ?? undefined
    );
    const [page, setPage] = useState<number>(1);

    const s = api.admin.searchSounds.useQuery({
        title,
        sortBy,
        soundType,
        page,
        uploader,
    });
    const p = api.admin.searchSoundsPageCount.useQuery({
        title,
        soundType,
        uploader,
    });

    const [currentSoundID, setCurrentSoundID] = useState(-1);
    const currentSound = api.admin.getSingleSound.useQuery(currentSoundID);

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setTitle(
            inputRef.current?.value !== "" ? inputRef.current?.value : undefined
        );
        setSoundType(typeRef.current?.value as SoundTypes);
        setSortBy(sortRef.current?.value ?? "new");
        setUploader(
            uploaderRef.current?.value !== ""
                ? uploaderRef.current?.value
                : undefined
        );
    }

    return (
        <div className="flex h-full flex-col items-center text-white">
            <form onSubmit={handleFormSubmit} className="my-2 text-center">
                <div className="mb-2 flex space-x-2">
                    <TextInput
                        ref={inputRef}
                        placeholder="title"
                        className="w-96"
                    />
                    <TextInput
                        ref={uploaderRef}
                        placeholder="userID"
                        className="w-96"
                        defaultValue={uploaderIDParam ?? ""}
                    />
                </div>
                <label htmlFor="type" className="mx-2">
                    sound type:
                </label>
                <Select
                    id="type"
                    name="type"
                    ref={typeRef}
                    defaultValue={"any"}
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
                    defaultValue={"new"}
                >
                    <Option value="new">new</Option>
                    <Option value="old">old</Option>
                    <Option value="az">{"a->z"}</Option>
                    <Option value="za">{"z->a"}</Option>
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
