import SoundPlayer from "~/app/_components/SoundPlayer";
import { api } from "~/trpc/server";
import { getBaseUrl } from "~/trpc/shared";

export default async function SoundLink({
    params,
}: {
    params: { id: string | number };
}) {
    if (isNaN(params.id as number)) return null; // TODO: return an invalid query response

    const sound = await api.search.getSoundByID.query(
        parseInt(params.id as string)
    );

    if (sound === null) return null; // TODO: return sound not found

    return (
        <div className="flex mt-10">
            <div className="m-auto">
                <SoundPlayer sound={sound} url={getBaseUrl()} />
            </div>
        </div>
    );
}
