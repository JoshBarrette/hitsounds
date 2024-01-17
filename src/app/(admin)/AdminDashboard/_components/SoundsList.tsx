"use client";
import { api } from "~/trpc/react";
import AdminSoundsTable from "./AdminSoundsTable";
import { useState } from "react";

export default function SoundsList(props: { url: string }) {
    const s = api.admin.getSounds.useQuery();
    const [currentSoundID, setCurrentSoundID] = useState(-1);
    const currentSound = api.admin.getSingleSound.useQuery(currentSoundID);

    return (
        <div className="flex h-full">
            <div>
                <AdminSoundsTable
                    url={props.url}
                    sounds={s.data}
                    setCurrentSoundID={setCurrentSoundID}
                />
            </div>

            <div className="h-full w-[calc(100vw/2)] bg-neutral-800">
                {JSON.stringify(currentSound.data)}
            </div>
        </div>
    );
}
