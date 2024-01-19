import { RouterOutputs } from "~/trpc/shared";
import DownloadButton from "./DownloadButton";
import CopyLinkButton from "./CopyLinkButton";

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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
