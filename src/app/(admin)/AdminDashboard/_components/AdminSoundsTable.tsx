import { RouterOutputs } from "~/trpc/shared";
import CopyLinkButton from "~/app/(client)/_components/CopyLinkButton";

export default function AdminSoundsTable(props: {
    sounds: RouterOutputs["admin"]["getSounds"] | undefined;
    url: string;
    setCurrentSoundID: (id: number) => void;
}) {
    return (
        <div className="flex">
            <table className="mx-auto w-[calc(100vw/2)] border-separate border-spacing-y-1">
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
                        <tr
                            key={key}
                            className="rounded-md bg-neutral-500 text-xl"
                        >
                            <td className="mx-2 w-96 break-words text-center font-medium">
                                {sound.title}
                            </td>
                            <td className="flex">
                                <audio
                                    controls
                                    className="m-auto h-10 rounded-lg text-white"
                                    preload="none"
                                >
                                    <source src={sound.url} type="audio/wav" />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </td>
                            <td className="font-medium">
                                <div className="flex">
                                    <p className="mx-auto">
                                        {sound.soundType}sound
                                    </p>
                                </div>
                            </td>
                            <td className="ml-auto flex">
                                <div className="m-auto flex p-1">
                                    <CopyLinkButton
                                        url={props.url}
                                        soundID={sound.id}
                                    />
                                    <button
                                        className="m-auto rounded-md bg-neutral-500 p-1.5 transition-all hover:bg-neutral-600 active:bg-neutral-400"
                                        onClick={() =>
                                            props.setCurrentSoundID(sound.id)
                                        }
                                    >
                                        View Sound
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
