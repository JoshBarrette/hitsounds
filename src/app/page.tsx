import { getBaseUrl } from "~/trpc/shared";
import SoundPlayer from "./_components/SoundPlayer";
import { api } from "~/trpc/server";
import SoundPlayerHeader from "./_components/SoundPlayerHeader";
import HomePageFilter from "./_components/HomePageFilter";
import HomePageSearchBar from "./_components/HomePageSearchBar";

export default async function Home() {
    const searcher = await api.search.search.query({
        sortBy: "new",
        count: 50,
    });

    return (
        <div className="flex">
            <div className="mx-auto">
                <div className="mb-28 mt-64 h-96 flex-col">
                    <h3 className="m-auto text-center text-5xl font-medium text-white">
                        ...hitsounds
                    </h3>
                    <p className="m-auto text-center text-xl font-medium text-white">
                        Hitsounds and Killsounds for Team Fortress 2
                    </p>
                    <HomePageSearchBar />
                </div>
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
