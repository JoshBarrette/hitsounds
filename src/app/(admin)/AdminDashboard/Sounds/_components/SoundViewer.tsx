"use client";

import { RouterOutputs } from "~/trpc/shared";

export default function SoundViewer(props: {
    sound: RouterOutputs["admin"]["getSingleSound"];
}) {
    if (props.sound === null) {
        return null;
    }

    const d = new Date(props.sound?.createdAt ?? "");

    return (
        <div className="text-xl text-white">
            <div className="ml-4">
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
                            <td className="text-neutral-400">
                                Uploader userID:
                            </td>
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
        </div>
    );
}
