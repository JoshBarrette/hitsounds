"use client";
import Image from "next/image";
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
            <p className="ml-auto my-auto">{props.sound.soundType}sound</p>
            <div className="flex ml-auto">
                <a
                    href={props.sound.url}
                    className="my-auto mr-2 flex h-10 rounded-md bg-green-500 px-3"
                >
                    <p className="m-auto">download</p>
                </a>
                <div
                    className="hover:cursor-pointer"
                    onClick={() =>
                        navigator.clipboard.writeText(
                            `${props.url}/s/${props.sound.id}`
                        )
                    }
                >
                    <Image
                        src={"/copy.png"}
                        width="40"
                        height="1"
                        alt="Copy link to sound"
                    />
                </div>
            </div>
        </div>
    );
}
