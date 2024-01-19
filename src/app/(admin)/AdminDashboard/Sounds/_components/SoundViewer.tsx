"use client";

import { Button } from "~/app/_components/Button";
import { RouterOutputs } from "~/trpc/shared";
import { api } from "~/trpc/react";
import { useState } from "react";

export default function SoundViewer(props: {
    sound: RouterOutputs["admin"]["getSingleSound"];
    refreshSounds: () => void;
}) {
    if (props.sound === null) {
        return null;
    }

    return (
        <div className="ml-4 text-xl text-white">
            <DataDiv sound={props.sound} />
            <OptionsDiv
                sound={props.sound}
                refreshSounds={props.refreshSounds}
            />
        </div>
    );
}

function DataDiv(props: { sound: RouterOutputs["admin"]["getSingleSound"] }) {
    const d = new Date(props.sound?.createdAt ?? "");

    return (
        <div>
            <h1 className="my-4 text-3xl">Data</h1>
            <table className="border-separate border-spacing-x-3">
                <tbody>
                    <tr>
                        <td className="text-neutral-400">SoundID:</td>
                        <td>{props.sound?.id}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-400">Title:</td>
                        <td>{props.sound?.title}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-400">Description:</td>
                        <td>{props.sound?.description ?? <i>None</i>}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-400">Sound Type:</td>
                        <td>{props.sound?.soundType}sound</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-400">Uploader userID:</td>
                        <td>{props.sound?.uploader?.userID}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral-400">Created at:</td>
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
    sound: RouterOutputs["admin"]["getSingleSound"];
    refreshSounds: () => void;
}) {
    return (
        <div>
            <h1 className="my-4 text-3xl">Options</h1>
            <div className="flex space-x-4">
                <div>
                    <Button className="text-md px-3 py-1">View Uploader</Button>
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
        <div className="relative text-center">
            <Button
                className="text-md px-3 py-1"
                onClick={() => setShowConfirm(true)}
            >
                Delete Sound
            </Button>

            {showConfirm && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="mt-36 rounded-md bg-zinc-600 p-2">
                        {del.isLoading ? (
                            <p className="mb-2 whitespace-nowrap">
                                Deleting Sound...
                            </p>
                        ) : (
                            <p className="mb-2 whitespace-nowrap">
                                Confirm Delete
                            </p>
                        )}
                        <div className="flex space-x-2">
                            <Button
                                onClick={() => del.mutate(props.id)}
                                disabled={del.isLoading}
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={() => setShowConfirm(false)}
                                disabled={del.isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
