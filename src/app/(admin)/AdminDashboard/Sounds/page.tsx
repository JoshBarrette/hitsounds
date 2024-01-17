import { getBaseUrl } from "~/trpc/shared";
import SoundsList from "./_components/SoundsList";

export default function SoundsPage() {
    return <SoundsList url={getBaseUrl()} />
}