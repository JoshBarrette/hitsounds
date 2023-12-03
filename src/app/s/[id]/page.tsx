import SoundPlayer from "~/app/_components/SoundPlayer";
import SoundPlayerHeader from "~/app/_components/SoundPlayerHeader";
import { api } from "~/trpc/server";
import { getBaseUrl } from "~/trpc/shared";

function SoundNotFound() {
    return (
        <div className="mt-10 flex">
            <div className="m-auto">
                <p className="text-2xl font-semibold">Sound Not Found.</p>
            </div>
        </div>
    );
}

export default async function SoundLink({
    params,
}: {
    params: { id: string | number };
}) {
    if (isNaN(params.id as number)) return <SoundNotFound />;

    const sound = await api.search.getSoundByID.query(
        parseInt(params.id as string)
    );

    if (sound === null) return <SoundNotFound />;
    return (
        <div className="min-h-screen flex">
            <div className="mx-auto mt-10">
                <SoundPlayerHeader />
                <SoundPlayer sound={sound} url={getBaseUrl()} />
            </div>
        </div>
    );
}
