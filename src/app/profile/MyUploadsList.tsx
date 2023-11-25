"use client";

import { useUser } from "@clerk/nextjs";
import { trpc } from "../_trpc/client";
import SoundPlayerList from "../_components/SoundPlayerList";
import { useState } from "react";

export default function MyUploadsList() {
    const user = useUser();
    if (!user.isLoaded) return null;
    const mySounds = trpc.profile.soundsByUploader.useQuery({
        userID: user.user?.id ?? "",
    }).data;

    return (
        <div>
            <SoundPlayerList sounds={mySounds} />
        </div>
    );
}
