"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";

function ProfileSoundPlayerListHeader() {
    return (
        <div className="flex text-center">
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
                <p className="ml-4 w-64">options</p>
            </div>
        </div>
    );
}

export default function ProfileSoundPlayerList(props: {
    sounds: RouterOutputs["search"]["search"] | undefined;
    url: string;
}) {
    if (props.sounds === undefined) return null;
    const [sounds, setSounds] = useState([...props.sounds]);
    const [isDisabled, setIsDisabled] = useState(false);
    const deleteSound = api.files.delete.useMutation({
        onSuccess(data) {
            let newSounds = sounds.filter((sound) => sound.id !== data.id);
            setSounds(newSounds);
        },
        onSettled() {
            setIsDisabled(false);
        },
    });

    function handleDelete(id: number) {
        deleteSound.mutate({ id: id });
        setIsDisabled(true);
    }

    return (
        <>
            {sounds.length > 0 ? <ProfileSoundPlayerListHeader /> : null}
            {sounds?.map((sound, key) => (
                <div className="mb-1 flex bg-cyan-500 p-1" key={key}>
                    <p className="mx-2 my-auto w-96 break-words text-center">
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
                        className="my-auto mr-2 flex h-10 rounded-md bg-green-500 px-3"
                    >
                        <p className="m-auto">download</p>
                    </a>
                    <button // TODO: replace with share icon
                        className="my-auto mr-2 flex rounded-md bg-indigo-600 px-3 py-2 text-white"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                `${props.url}/s/${sound.id}`
                            )
                        }
                    >
                        copy link
                    </button>
                    {/* <button
                        className="my-auto mr-2 flex rounded-md bg-yellow-500 px-3 py-2 disabled:bg-yellow-950 disabled:text-white"
                        disabled={isDisabled}
                    >
                        edit
                    </button> */}
                    <button
                        className="my-auto mr-2 flex rounded-md bg-red-500 px-3 py-2 text-white disabled:bg-red-950"
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
