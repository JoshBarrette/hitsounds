import SoundPlayer from "./SoundPlayer";

export default function SoundPlayerList(props: {
    sounds:
        | {
              id: number;
              title: string;
              description: string | null;
              url: string;
              soundType: string;
              createdAt: Date | string;
          }[]
        | undefined;
}) {
    if (props.sounds === undefined) {
        return null;
    }

    return (
        <>
            {props.sounds.map((sound, key) => {
                <SoundPlayer sound={sound} key={key} />;
            })}
        </>
    );
}
