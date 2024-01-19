import Link from "next/link";
import SoundsTable from "../../../_components/SoundsTable";
import { api } from "~/trpc/server";
import { getBaseUrl } from "~/trpc/shared";

function SoundNotFound() {
    return (
        <div className="mt-10 flex font-semibold text-white text-center">
            <div className="m-auto">
                <p className="text-2xl">
                    Sound Not Found.
                </p>
                <div className="mx-auto mt-10 w-48 rounded-sm transition-all hover:bg-cyan-500 hover:text-black">
                    <Link href="/">
                        <h1 className="p-2 text-3xl">
                            Go home...
                        </h1>
                    </Link>
                </div>
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
        <div className="flex">
            <div className="mx-auto mt-10">
                <SoundsTable sounds={[sound]} url={getBaseUrl()} />
            </div>
        </div>
    );
}
