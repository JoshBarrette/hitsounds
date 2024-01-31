"use client";
import Image from "next/image";
import useURL from "~/app/_components/URLContext";

export default function CopyLinkButton(props: {
    soundID: number;
}) {
    const url = useURL();
    
    return (
        <div className="group">
            <div
                className="rounded-md transition-all hover:cursor-pointer bg-neutral-400"
                onClick={() =>
                    navigator.clipboard.writeText(
                        `${url}/s/${props.soundID}`
                    )
                }
            >
                <Image
                    src={"/link-svgrepo-com.svg"}
                    width="40"
                    height="1"
                    alt="Copy link to sound"
                    className="p-2"
                />
            </div>
            <div className="pointer-events-none absolute z-30 -ml-16 mt-1 scale-0 rounded-md bg-zinc-600 px-3 py-1 text-white transition-all group-hover:scale-100">
                <p>Copy Link to Sound</p>
            </div>
        </div>
    );
}
