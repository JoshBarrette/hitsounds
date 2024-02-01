"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "~/app/_components/Button";

export default function DeleteSoundButton(props: {
    soundId: number;
    isDisabled: boolean;
    handleDelete: (id: number) => void;
}) {
    const [showWindow, setShowWindow] = useState(false);

    return (
        <div className="relative whitespace-nowrap">
            <div className="group">
                <button
                    className="my-auto flex h-10 rounded-md bg-red-600 text-white transition-all disabled:bg-red-950 disabled:text-black"
                    onClick={() => setShowWindow(!showWindow)}
                    disabled={props.isDisabled}
                >
                    <Image
                        src={"/delete-svgrepo-com.svg"}
                        width="40"
                        height="1"
                        alt="Delete sound"
                        className="p-2"
                    />
                </button>
                <div className="pointer-events-none absolute right-1/2 z-10 mt-1 translate-x-1/2 scale-0 rounded-md bg-red-900 px-3 py-1 text-white transition-all group-hover:scale-100">
                    <p>Delete Sound</p>
                </div>
            </div>

            {showWindow && (
                <div className="absolute right-1/2 z-10 mt-1 flex translate-x-1/2 space-x-2 rounded-md bg-zinc-600 p-2">
                    <Button
                        className="border-none bg-red-600 text-black hover:border-none"
                        onClick={() => props.handleDelete(props.soundId)}
                        disabled={props.isDisabled}
                    >
                        Confirm
                    </Button>
                    <Button
                        className="border-neutral-400 text-black hover:border-black"
                        onClick={() => setShowWindow(false)}
                        disabled={props.isDisabled}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
}
