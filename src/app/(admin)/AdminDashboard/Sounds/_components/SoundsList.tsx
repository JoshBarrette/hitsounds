"use client";
import { api } from "~/trpc/react";
import AdminSoundsTable from "./AdminSoundsTable";
import SoundViewer from "./SoundViewer";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SoundsList(props: { url: string }) {
    const s = api.admin.getSounds.useQuery();
    const searchParams = useSearchParams();
    const soundIDParam = parseInt(searchParams.get("s") ?? "-1");
    const [currentSoundID, setCurrentSoundID] = useState(soundIDParam);
    const currentSound = api.admin.getSingleSound.useQuery(currentSoundID);

    return (
        <div className="flex h-full flex-col items-center">
            <p className="text-white">FILTERING HERE</p>

            <div className="flex h-full w-full">
                <div className="flex-1">
                    <AdminSoundsTable
                        url={props.url}
                        sounds={s.data}
                        setCurrentSoundID={setCurrentSoundID}
                    />
                </div>

                <div className="h-full flex-1 bg-red-400">
                    {currentSound.isSuccess ? (
                        <SoundViewer sound={currentSound.data} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
