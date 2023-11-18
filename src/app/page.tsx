import SoundPlayer from "./_components/SoundPlayer";
import Upload from "./_components/Upload";

export default async function Home() {
    return (
        <div>
            <Upload />
            <SoundPlayer />
        </div>
    );
}
