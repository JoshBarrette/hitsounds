import { getBaseUrl } from "~/trpc/shared";
import SoundsList from "./_components/SoundsList";

export default function SoundsPage() {
    return (
        <div className="w-full h-full max-h-full">
            <SoundsList url={getBaseUrl()} />
        </div>
    );
}
