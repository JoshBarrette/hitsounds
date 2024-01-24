import PageSelector from "~/app/_components/PageSelector";
import { RouterOutputs } from "~/trpc/shared";

export default function AdminSoundsTable(props: {
    sounds: RouterOutputs["admin"]["searchSounds"] | undefined;
    url: string;
    setCurrentSoundID: (id: number) => void;
    currentPage: number;
    totalPages: number;
    setPage: (n: number) => void;
}) {
    if (!props.sounds) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <table className="mx-auto mb-4 w-full border-separate border-spacing-y-1">
                <thead>
                    <tr className="text-center text-white">
                        <th>name</th>
                        <th>preview</th>
                        <th>type</th>
                        <th>options</th>
                    </tr>
                </thead>

                <tbody className="text-black">
                    <AdminSoundsTableBody
                        sounds={props.sounds}
                        setCurrentSoundID={props.setCurrentSoundID}
                    />
                </tbody>
            </table>

            <PageSelector
                size={props.totalPages}
                currentPage={props.currentPage}
                setPage={props.setPage}
            />
        </div>
    );
}

function AdminSoundsTableBody(props: {
    sounds: RouterOutputs["admin"]["getSounds"] | undefined;
    setCurrentSoundID: (id: number) => void;
}) {
    return (
        <>
            {props.sounds?.map((sound, key) => (
                <tr key={key} className="rounded-md bg-neutral-500 text-xl">
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
                            Your browser does not support the audio element.
                        </audio>
                    </td>
                    <td className="font-medium">
                        <div className="flex">
                            <p className="mx-auto">{sound.soundType}sound</p>
                        </div>
                    </td>
                    <td>
                        <button
                            className="m-auto w-full rounded-md bg-neutral-500 p-1.5 transition-all hover:bg-neutral-600 active:bg-neutral-400"
                            onClick={() => props.setCurrentSoundID(sound.id)}
                        >
                            View
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
