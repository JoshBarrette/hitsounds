"use client";

import { api } from "~/trpc/react";
import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";
import { getBaseUrl } from "~/trpc/shared";

export default function MyUploads() {
    const sounds = api.search.getMySounds.useQuery().data;

    return (
        <div className="flex min-h-screen">
            <div className="mx-auto">
                <p className="w-full p-4 text-center text-3xl font-medium text-white">
                    My Uploads
                </p>
                <ProfileSoundPlayerList sounds={sounds} url={getBaseUrl()} />
            </div>
        </div>
    );
}
