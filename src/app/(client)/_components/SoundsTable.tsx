"use client";
import { RouterOutputs } from "~/trpc/shared";
import DownloadButton from "./DownloadButton";
import CopyLinkButton from "./CopyLinkButton";
import { Source, Audio } from "~/app/_components/Audio";
import { updateHistory } from "../_actions/playHistory";

export default function SoundsTable(props: {
    sounds: RouterOutputs["search"]["search"] | undefined;
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
                    {props.sounds?.map((sound, key) => (
                        <tr key={key} className="bg-white font-medium">
                            <td className="mx-2 w-96 break-words text-center text-lg">
                                {sound.title}
                            </td>
                            <td>
                                <Audio
                                    onPlay={async () =>
                                        updateHistory({
                                            title: sound.title,
                                            id: sound.id,
                                        })
                                    }
                                >
                                    <Source src={sound.url} />
                                </Audio>
                            </td>
                            <td className="px-4">{sound.soundType}sound</td>
                            <td className="ml-auto flex space-x-2 p-1">
                                <DownloadButton url={sound.url} />
                                <CopyLinkButton soundID={sound.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
