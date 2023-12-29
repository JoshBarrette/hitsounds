import ProfileHeader from "./_components/ProfileHeader";
import ProfileSoundPlayerList from "./_components/ProfileSoundPlayerList";
import { getBaseUrl } from "~/trpc/shared";

export default function MyUploads() {
    return (
        <div className="flex">
            <div className="mx-auto">
                <ProfileHeader />
                {/* <p className="w-full p-4 text-center text-3xl font-medium text-white">
                    My Uploads
                </p> */}
                <ProfileSoundPlayerList url={getBaseUrl()} />
            </div>
        </div>
    );
}
