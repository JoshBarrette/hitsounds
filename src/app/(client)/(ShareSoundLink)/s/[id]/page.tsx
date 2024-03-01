import Link from "next/link";
import SoundsTable from "../../../_components/SoundsTable";
import { api } from "~/trpc/server";
import { getBaseUrl } from "~/trpc/shared";
import { Metadata } from "next";

type PageProps = {
    params: { id: string };
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const sound = await api.search.getSoundByID.query(
        parseInt(params.id as string)
    );

    if (!sound) {
        return {
            openGraph: {
                title: "Sound Not Found",
                url: getBaseUrl(),
            },
        };
    }

    return {
        title: "Hitsounds: " + sound!.title,
        openGraph: {
            title: sound!.title,
            description: sound!.description ?? "",
            url: getBaseUrl() + "/s/" + sound!.id,
            audio: [
                {
                    url: sound!.url,
                    type: "audio/wav",
                },
            ],
        },
    };
}

function SoundNotFound() {
    return (
        <div className="mt-10 flex text-center font-semibold text-white">
            <div className="m-auto">
                <p className="text-2xl">Sound Not Found.</p>
                <div className="mx-auto mt-10 w-48 rounded-sm transition-all hover:bg-cyan-500 hover:text-black">
                    <Link href="/">
                        <h1 className="p-2 text-3xl">Go home...</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default async function SoundLink({ params }: PageProps) {
    if (isNaN(parseInt(params.id as string))) return <SoundNotFound />;

    const sound = await api.search.getSoundByID.query(
        parseInt(params.id as string)
    );

    if (sound === null) return <SoundNotFound />;
    return (
        <div className="flex">
            <div className="mx-auto mt-10">
                <SoundsTable sounds={[sound]} />
            </div>
        </div>
    );
}
