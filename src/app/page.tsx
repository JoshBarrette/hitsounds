import SoundPlayer from "./_components/SoundPlayer";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
    const first20Sounds = await serverClient.search.getNSounds();
    const searcher = await serverClient.search.search();

    return (
        <div className="flex">
            <div className="mx-auto">
                <p>first 20</p>
                {first20Sounds.map((sound, key) => {
                    return <SoundPlayer sound={sound} key={key} />;
                })}
                <p>search</p>
                {searcher.map((sound, key) => {
                    return <SoundPlayer sound={sound} key={key} />;
                })}
            </div>
        </div>
    );
}
