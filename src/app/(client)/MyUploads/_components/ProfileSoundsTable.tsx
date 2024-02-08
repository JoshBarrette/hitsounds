"use client";
import CopyLinkButton from "~/app/(client)/_components/CopyLinkButton";
import DownloadButton from "~/app/(client)/_components/DownloadButton";
import { api } from "~/trpc/react";
import { FormEvent, createRef, useState } from "react";
import DeleteSoundButton from "./DeleteSoundButton";
import { RouterOutputs, SoundTypes } from "~/trpc/shared";
import { Button } from "~/app/_components/Button";
import { Option, Select } from "~/app/_components/Select";
import { TextInput } from "~/app/_components/TextInput";
import { Audio, Source } from "~/app/_components/Audio";

export default function ProfileSoundsTable() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [soundType, setSoundType] = useState<SoundTypes>(undefined);

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
        setSoundType(typeRef.current?.value as SoundTypes);
    }

    return (
        <div>
            <form
                onSubmit={handleFormSubmit}
                className="my-2 text-center text-white"
            >
                <TextInput
                    ref={inputRef}
                    placeholder="search"
                    defaultValue={""}
                    className="w-96"
                />
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
                <Button type="submit" className="mt-4">
                    Search
                </Button>
            </form>
            {soundsQuery.data?.length ?? -1 > 0 ? (
                <SoundTable
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

function SoundTable(props: {
    soundsQuery: RouterOutputs["search"]["getMySounds"];
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
                    {props.soundsQuery?.map((sound: any) => (
                        <tr key={sound.title} className="rounded-md bg-white">
                            <td className="mx-2 w-96 break-words text-center text-lg font-medium">
                                {sound.title}
                            </td>
                            <td>
                                <Audio>
                                    <Source src={sound.url} />
                                </Audio>
                            </td>
                            <td className="px-4 font-medium">
                                {sound.soundType}sound
                            </td>
                            <td className="ml-auto flex space-x-2 p-1">
                                <DownloadButton url={sound.url} />
                                <CopyLinkButton
                                    soundID={sound.id}
                                />
                                <DeleteSoundButton
                                    soundId={sound.id}
                                    isDisabled={props.isDisabled}
                                    handleDelete={props.handleDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
