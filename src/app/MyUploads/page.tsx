"use client";

import { api } from "~/trpc/react";
import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";

export default function Test() {
    const sounds = api.search.search.useQuery().data;

    return (
        <div className="flex">
            <div className="mx-auto">
                <ProfileSoundPlayerList sounds={sounds} />
            </div>
        </div>
    );
}
