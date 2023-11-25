"use client";

import { useUser } from "@clerk/nextjs";
import { trpc } from "../_trpc/client";
import SoundPlayerList from "../_components/SoundPlayerList";

export default function MyUploads() {
    const user = useUser();
    var mySounds = trpc.profile.soundsByUploader.useQuery({
        userID: user.user?.id as string,
    }).data;

    return (
        <div>
            <SoundPlayerList sounds={mySounds} />
        </div>
    );
}
