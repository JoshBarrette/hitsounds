import { getBaseUrl } from "~/trpc/shared";
import SoundPlayer from "./_components/SoundPlayer";
import { api } from "~/trpc/server";

export default async function Home() {
    const first20Sounds = await api.search.getNSounds.query();
    const searcher = await api.search.search.query();

    return (
        <div className="flex">
            <div className="mx-auto">
                <p>first 20</p>
                {first20Sounds.map((sound, key) => {
                    return (
                        <SoundPlayer
                            sound={sound}
                            key={key}
                            url={getBaseUrl()}
                        />
                    );
                })}
                <p>search</p>
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
