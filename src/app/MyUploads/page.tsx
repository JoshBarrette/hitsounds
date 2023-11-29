"use client";

import { api } from "~/trpc/react";
import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";
import { getBaseUrl } from "~/trpc/shared";

export default function MyUploads() {
    const sounds = api.search.getMySounds.useQuery().data;

    return (
        <div className="flex">
            <div className="mx-auto">
                <ProfileSoundPlayerList sounds={sounds} url={getBaseUrl()} />
            </div>
        </div>
    );
}
