import { trpc } from "../_trpc/client";
import SoundPlayerList from "../_components/SoundPlayerList";

export default function MyUploads() {
    var mySounds = trpc.profile.myUploads.useQuery().data;

    return (
        <div>
            <SoundPlayerList sounds={mySounds} />
        </div>
    );
}
