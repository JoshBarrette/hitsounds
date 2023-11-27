"use client";

import { api } from "~/trpc/react";
import SoundPlayerList from "../_components/SoundPlayerList";

export default function Test() {
    const sounds = api.search.search.useQuery().data;

    return (
        <div>
            <SoundPlayerList sounds={sounds} />
        </div>
    );
}
