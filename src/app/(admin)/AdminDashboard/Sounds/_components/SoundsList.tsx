"use client";
import { api } from "~/trpc/react";
import { FormEvent, createRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Option, Select } from "~/app/_components/Select";
import { Button } from "~/app/_components/Button";
import { RouterOutputs, SoundTypes } from "~/trpc/shared";
import { TextInput } from "~/app/_components/TextInput";
import Link from "next/link";
import useURL from "~/app/_components/URLContext";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "~/app/_components/Accordion";

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
                <div className="space-y-2">
                    {s.data.map((sound, k) => {
                        return (
                            <SoundAccordion
                                sound={sound}
                                refreshSounds={() => {
                                    s.refetch();
                                    setCurrentSoundID(s.data![0].id);
                                }}
                                key={k}
                            />
                        );
                    })}
                </div>
            ) : (
                <p className="text-3xl font-medium">
                    {s.isLoading ? "Loading..." : "No Sounds Found"}
                </p>
            )}
        </div>
    );
}

function SoundAccordion({
    sound,
    refreshSounds,
}: {
    sound: RouterOutputs["admin"]["searchSounds"][0];
    refreshSounds: () => void;
}) {
    return (
        <Accordion>
            <AccordionHeader className="space-x-6">
                <p>
                    {sound.title} - dbID: {sound.id}
                </p>
            </AccordionHeader>
            <AccordionBody>
                <div className="px-4 py-2">
                    <DataDiv sound={sound} />
                    <OptionsDiv sound={sound} refreshSounds={refreshSounds} />
                </div>
            </AccordionBody>
        </Accordion>
    );
}

function DataDiv(props: { sound: RouterOutputs["admin"]["searchSounds"][0] }) {
    const d = new Date(props.sound?.createdAt ?? "");

    return (
        <div>
            <table className="border-separate">
                <tbody>
                    <tr>
                        <td className="text-neutral-600">SoundID:</td>
                        <td>{props.sound?.id}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Title:</td>
                        <td>{props.sound?.title}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Description:</td>
                        <td>{props.sound?.description ?? <i>None</i>}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Sound Type:</td>
                        <td>{props.sound?.soundType}sound</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Uploader dbID:</td>
                        <td>{props.sound?.uploaderId}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Uploader userID:</td>
                        <td>{props.sound?.uploader?.userID}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-600">Created at:</td>
                        <td>
                            {d.toDateString() +
                                ", " +
                                d.toLocaleTimeString("en-US")}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function OptionsDiv(props: {
    sound: RouterOutputs["admin"]["searchSounds"][0];
    refreshSounds: () => void;
}) {
    const url = useURL();

    return (
        <div>
            <div className="flex space-x-4">
                <div>
                    <Link
                        href={`${url}/AdminDashboard/Users?u=${props.sound?.uploader?.userID}`}
                    >
                        <Button className="border-neutral-400 text-black hover:border-black">
                            View Uploader
                        </Button>
                    </Link>
                </div>

                <AdminDeleteButton
                    id={props.sound!.id}
                    refreshSounds={props.refreshSounds}
                />
            </div>
        </div>
    );
}

function AdminDeleteButton(props: { id: number; refreshSounds: () => void }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const del = api.admin.deleteSound.useMutation({
        onSuccess: () => {
            props.refreshSounds();
            alert("Sound Successfully Deleted");
        },
        onError: () => {
            alert("Error When Attempting Delete");
        },
        onSettled: () => setShowConfirm(false),
    });

    return (
        <div className="relative space-x-2 text-center">
            {showConfirm ? (
                <>
                    <Button
                        onClick={() => del.mutate(props.id)}
                        disabled={del.isLoading}
                        className="border-none bg-red-600 text-black hover:border-none"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => setShowConfirm(false)}
                        disabled={del.isLoading}
                        className="border-neutral-400 text-black hover:border-black"
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <Button
                    className="border-none bg-red-600 text-black hover:border-none"
                    onClick={() => setShowConfirm(true)}
                >
                    Delete Sound
                </Button>
            )}
        </div>
    );
}
