"use client";
import CopyLinkButton from "~/app/_components/CopyLinkButton";
import DownloadButton from "~/app/_components/DownloadButton";
import { api } from "~/trpc/react";
import { FormEvent, createRef, useState } from "react";
import DeleteSoundButton from "./DeleteSoundButton";
import { RouterOutputs } from "~/trpc/shared";

function SoundTable(props: {
    soundsQuery: RouterOutputs["search"]["getMySounds"];
    url: string;
    isDisabled: boolean;
    handleDelete: (id: number) => void;
}) {
    return (
        <div className="flex">
            <table className="mx-auto border-separate border-spacing-y-1">
                <thead>
                    <tr className="text-center text-white">
                        <th>name</th>
                        <th>preview</th>
                        <th>type</th>
                        <th>options</th>
                    </tr>
                </thead>

                <tbody>
                    {props.soundsQuery?.map((sound: any, key: any) => (
                        <tr key={key} className="rounded-md bg-neutral-500">
                            <td className="mx-2 w-96 break-words text-center text-lg font-medium">
                                {sound.title}
                            </td>
                            <td>
                                <audio
                                    controls
                                    className="my-auto h-10 rounded-lg text-white"
                                    preload="none"
                                >
                                    <source src={sound.url} type="audio/wav" />
                                    {/* <source src={url} type="audio/x-pn-wav" /> */}
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </td>
                            <td className="px-4 font-medium">
                                {sound.soundType}sound
                            </td>
                            <td className="ml-auto flex">
                                <div className="my-auto flex p-1">
                                    <DownloadButton url={sound.url} />
                                    <CopyLinkButton
                                        url={props.url}
                                        soundID={sound.id}
                                    />
                                    <DeleteSoundButton
                                        soundId={sound.id}
                                        isDisabled={props.isDisabled}
                                        handleDelete={props.handleDelete}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function ProfileSoundsTable(props: { url: string }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [soundType, setSoundType] = useState("");
    
    const inputRef = createRef<HTMLInputElement>();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();

    const soundsQuery = api.search.getMySounds.useQuery({
        title,
        sortBy,
        soundType,
    });
    const deleteSound = api.files.delete.useMutation({
        onSettled() {
            setIsDisabled(false);
            soundsQuery.refetch();
        },
    });

    function handleDelete(id: number) {
        deleteSound.mutate({ id: id });
        setIsDisabled(true);
    }

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setTitle(inputRef.current?.value ?? "");
        setSortBy(sortRef.current?.value ?? "");
        setSoundType(typeRef.current?.value ?? "");
    }

    return (
        <div>
            <form
                onSubmit={handleFormSubmit}
                className="my-2 text-center text-white"
            >
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="search"
                    defaultValue={""}
                    className="w-96 rounded-sm bg-cyan-900 text-center leading-8 text-white placeholder:text-neutral-200"
                />
                <label htmlFor="type" className="ml-2">
                    sound type:
                </label>
                <select
                    id="type"
                    name="type"
                    className="text-md mx-2 my-auto w-28 rounded-sm bg-cyan-900 p-1 font-sans font-medium"
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
                </select>
                <label htmlFor="sortByInput" className="mr-2">
                    sort by:
                </label>
                <select
                    id="sortByInput"
                    name="sortByInput"
                    className="text-md my-auto mr-2 w-24 rounded-sm bg-cyan-900 p-1 font-sans font-medium text-white"
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
                </select>
                <br />
                <button type="submit" className="default-button mt-4">
                    Search
                </button>
            </form>
            {soundsQuery.data?.length ?? -1 > 0 ? (
                <SoundTable
                    url={props.url}
                    soundsQuery={soundsQuery.data}
                    isDisabled={isDisabled}
                    handleDelete={handleDelete}
                />
            ) : (
                <p className="mt-8 text-center text-3xl font-medium text-white">
                    No Sounds Found
                </p>
            )}
        </div>
    );
}
