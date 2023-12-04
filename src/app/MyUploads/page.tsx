import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";
import { getBaseUrl } from "~/trpc/shared";

export default function MyUploads() {
    return (
        <div className="flex min-h-screen">
            <div className="mx-auto">
                <p className="w-full p-4 text-center text-3xl font-medium text-white">
                    My Uploads
                </p>
                <ProfileSoundPlayerList url={getBaseUrl()} />
            </div>
        </div>
    );
}
