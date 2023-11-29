"use client";
import { RouterOutputs } from "~/trpc/shared";

export default function SoundPlayer(props: {
    sound: RouterOutputs["search"]["search"][0];
    url: string;
}) {
    return (
        <div className="mb-1 flex bg-yellow-500 p-1">
            <p className="mx-2 my-auto w-96 break-words text-center">
                {props.sound.title}
            </p>
            <audio
                controls
                className="my-auto h-10 rounded-lg text-white"
                preload="none"
            >
                <source src={props.sound.url} type="audio/wav" />
                {/* <source src={url} type="audio/x-pn-wav" /> */}
                Your browser does not support the audio element.
            </audio>
            <p className="mx-4 my-auto">{props.sound.soundType}sound</p>
            <a
                href={props.sound.url}
                className="my-auto mr-2 flex h-10 rounded-md bg-green-500 px-3"
            >
                <p className="m-auto">download</p>
            </a>
            <button // TODO: replace with share icon
                className="my-auto mr-2 flex rounded-md bg-indigo-600 px-3 py-2 text-white"
                onClick={() =>
                    navigator.clipboard.writeText(
                        `${props.url}/s/${props.sound.id}`
                    )
                }
            >
                copy link
            </button>
        </div>
    );
}
