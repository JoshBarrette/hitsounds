import { RouterOutputs, getBaseUrl } from "~/trpc/shared";
import SoundPlayer from "./SoundPlayer";
import SoundPlayerHeader from "./SoundPlayerHeader";

export default function SoundPlayerList(props: {
    sounds: RouterOutputs["search"]["search"] | undefined;
}) {
    if (props.sounds === undefined) {
        return null;
    }

    return (
        <>
            <SoundPlayerHeader />
            {props.sounds.map((sound, key) => (
                <SoundPlayer sound={sound} key={key} url={getBaseUrl()} />
            ))}
        </>
    );
}
