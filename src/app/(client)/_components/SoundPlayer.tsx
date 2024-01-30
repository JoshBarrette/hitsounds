"use client";
import { RouterOutputs } from "~/trpc/shared";
import CopyLinkButton from "./CopyLinkButton";
import DownloadButton from "./DownloadButton";
import { Source, Audio } from "~/app/_components/Audio";

export default function SoundPlayer(props: {
    sound: RouterOutputs["search"]["search"][0];
    url: string;
}) {
    return (
        <div className="mb-1 flex rounded-sm bg-neutral-500 p-1">
            <p className="mx-2 my-auto w-96 break-words text-center text-lg font-medium">
                {props.sound.title}
            </p>
            <Audio>
                <Source src={props.sound.url} />
            </Audio>
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
