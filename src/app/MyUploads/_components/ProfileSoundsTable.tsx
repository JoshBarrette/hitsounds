"use client";
import CopyLinkButton from "~/app/_components/CopyLinkButton";
import DownloadButton from "~/app/_components/DownloadButton";
import { api } from "~/trpc/react";
import { useState } from "react";
import DeleteSoundButton from "./DeleteSoundButton";

export default function ProfileSoundsTable(props: { url: string }) {
    const soundsQuery = api.search.getMySounds.useQuery();
    const [isDisabled, setIsDisabled] = useState(false);
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

    if (soundsQuery !== undefined) {
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
                        {soundsQuery.data?.map((sound, key) => (
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
                                        <source
                                            src={sound.url}
                                            type="audio/wav"
                                        />
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
                                            isDisabled={isDisabled}
                                            handleDelete={handleDelete}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <p className="mt-4 text-2xl text-white">No Sounds Found</p>;
    }
}
