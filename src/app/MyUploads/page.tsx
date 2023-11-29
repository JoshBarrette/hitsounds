import { api } from "~/trpc/server";
import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";
import { getBaseUrl } from "~/trpc/shared";

export default async function Test() {
    const sounds = await api.search.search.query();

    return (
        <div className="flex">
            <div className="mx-auto">
                <ProfileSoundPlayerList sounds={sounds} url={getBaseUrl()} />
            </div>
        </div>
    );
}
