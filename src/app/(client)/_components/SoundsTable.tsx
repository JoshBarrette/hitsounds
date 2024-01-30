import { RouterOutputs } from "~/trpc/shared";
import DownloadButton from "./DownloadButton";
import CopyLinkButton from "./CopyLinkButton";
import { Source, Audio   } from "~/app/_components/Audio";

export default function SoundsTable(props: {
    sounds: RouterOutputs["search"]["search"] | undefined;
    url: string;
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
                        <tr key={key} className="bg-neutral-500 font-medium">
                            <td className="mx-2 w-96 break-words text-center text-lg">
                                {sound.title}
                            </td>
                            <td>
                                <Audio>
                                    <Source src={sound.url} />
                                </Audio>
                            </td>
                            <td className="px-4">
                                {sound.soundType}sound
                            </td>
                            <td className="ml-auto flex space-x-2 p-1">
                                <DownloadButton url={sound.url} />
                                <CopyLinkButton
                                    url={props.url}
                                    soundID={sound.id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
