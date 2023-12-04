"use client";
import { useState } from "react";
import CopyLinkButton from "~/app/_components/CopyLinkButton";
import { api } from "~/trpc/react";

function ProfileSoundPlayerListHeader() {
    return (
        <div className="flex text-center text-white">
            <div>
                <p className="mx-3 w-96">name</p>
            </div>
            <div>
                <p className="ml-0.5 w-72">preview</p>
            </div>
            <div>
                <p className="ml-3.5 w-20">type</p>
            </div>
            <div>
                <p className="ml-4 w-52">options</p>
            </div>
        </div>
    );
}

export default function ProfileSoundPlayerList(props: { url: string }) {
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

    return (
        <>
            {(soundsQuery.data?.length ?? 0) > 0 ? (
                <ProfileSoundPlayerListHeader />
            ) : null}
            {soundsQuery.data?.map((sound, key) => (
                <div
                    className="mb-1 flex bg-neutral-500 p-1 font-medium"
                    key={key}
                >
                    <p className="mx-2 my-auto w-96 break-words text-center text-lg">
                        {sound.title}
                    </p>
                    <audio
                        controls
                        className="my-auto h-10 rounded-lg text-white"
                        preload="none"
                    >
                        <source src={sound.url} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                    <p className="w-18 mx-4 my-auto">{sound.soundType}sound</p>
                    <a
                        href={sound.url}
                        className="my-auto mr-2 flex h-10 rounded-md bg-cyan-500 px-3 transition-all hover:bg-cyan-600 active:bg-cyan-400"
                    >
                        <p className="m-auto">download</p>
                    </a>
                    <CopyLinkButton url={props.url} soundID={sound.id} />
                    <button
                        className="my-auto ml-1 mr-2 flex rounded-md bg-red-950 px-3 py-2 text-white transition-all hover:bg-red-800 active:bg-red-900 disabled:bg-red-300 disabled:text-black"
                        onClick={() => handleDelete(sound.id)}
                        disabled={isDisabled}
                    >
                        delete
                    </button>
                </div>
            ))}
        </>
    );
}
