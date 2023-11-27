import { RouterOutputs } from "~/trpc/shared";
import SoundPlayer from "./SoundPlayer";

export default function SoundPlayerList(props: {
    sounds: RouterOutputs["search"]["search"] | undefined;
}) {
    if (props.sounds === undefined) {
        return null;
    }

    return (
        <>
            {props.sounds.map((sound, key) => (
                <SoundPlayer sound={sound} key={key} />
            ))}
        </>
    );
}
