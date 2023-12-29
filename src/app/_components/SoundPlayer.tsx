"use client";
import { RouterOutputs } from "~/trpc/shared";
import CopyLinkButton from "./CopyLinkButton";
import Image from "next/image";
import DownloadButton from "./DownloadButton";

export default function SoundPlayer(props: {
    sound: RouterOutputs["search"]["search"][0];
    url: string;
}) {
    return (
        <div className="mb-1 flex rounded-sm bg-neutral-500 p-1">
            <p className="mx-2 my-auto w-96 break-words text-center text-lg font-medium">
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
            <p className="my-auto ml-auto font-medium">
                {props.sound.soundType}sound
            </p>
            <div className="ml-auto flex">
                <DownloadButton url={props.sound.url} />
                <CopyLinkButton url={props.url} soundID={props.sound.id} />
            </div>
        </div>
    );
}
