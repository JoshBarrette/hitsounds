import SoundPlayer from "./_components/SoundPlayer";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
    const first20Sounds = await serverClient.search.getFirst20Sounds();

    return (
        <div className="flex">
            <div className="mx-auto">
                {first20Sounds.map((sound, key) => {
                    return <SoundPlayer sound={sound} key={key} />;
                })}
            </div>
        </div>
    );
}
