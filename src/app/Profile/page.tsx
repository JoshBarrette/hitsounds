"use client";

import { trpc } from "../_trpc/client";
import SoundPlayer from "../_components/SoundPlayer";
import { ReactNode } from "react";

export default function MyUploads() {
    var mySounds = trpc.profile.myUploads.useQuery().data;
    if (mySounds === undefined) return null;

    return (
        <div>
            {mySounds.map((sound, key) => {
                <SoundPlayer sound={sound} key={key} />
            }) as ReactNode}
        </div>
    );
}
