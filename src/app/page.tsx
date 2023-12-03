import { getBaseUrl } from "~/trpc/shared";
import SoundPlayer from "./_components/SoundPlayer";
import { api } from "~/trpc/server";
import SoundPlayerHeader from "./_components/SoundPlayerHeader";
import HomePageFilter from "./_components/HomePageFilter";

export default async function Home() {
    const searcher = await api.search.search.query({
        sortBy: "new",
        count: 50,
    });

    return (
        <div className="flex min-h-screen">
            <div className="mx-auto">
                <p className="w-full p-4 text-center text-3xl font-medium text-white">
                    Most Recent Uploads
                </p>
                <div className="mx-auto mb-2">
                    <HomePageFilter />
                </div>
                <SoundPlayerHeader />
                {searcher.map((sound, key) => {
                    return (
                        <SoundPlayer
                            sound={sound}
                            key={key}
                            url={getBaseUrl()}
                        />
                    );
                })}
            </div>
        </div>
    );
}
