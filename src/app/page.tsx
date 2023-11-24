import SoundPlayer from "./_components/SoundPlayer";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
    const first20Sounds = await serverClient.search.getNSounds();
    const searcher = await serverClient.search.search();
    const userSearch = await serverClient.profile.soundsByUploader({
        userID: "user_2YO6StYX6G77CSBUdk8IcXoKynh",
    });

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
                <p>uploads by user</p>
                {userSearch.map((sound, key) => {
                    return <SoundPlayer sound={sound} key={key} />;
                })}
            </div>
        </div>
    );
}
