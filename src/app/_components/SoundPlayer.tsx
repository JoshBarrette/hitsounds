export default function SoundPlayer(props: {
    sound: {
        id: number;
        title: string;
        description: string | null;
        url: string;
        soundType: string;
        createdAt: Date | string;
    };
}) {
    return (
        <div className="mb-1 flex bg-yellow-500 p-1">
            <p className="mx-2 my-auto w-48">{props.sound.title}</p>
            <audio
                controls
                className="h-10 rounded-lg text-white"
                preload="none"
            >
                <source src={props.sound.url} type="audio/wav" />
                {/* <source src={url} type="audio/x-pn-wav" /> */}
                Your browser does not support the audio element.
            </audio>
            <p className="mx-4 my-auto">{props.sound.soundType}sound</p>
            <a
                href={props.sound.url}
                className="mr-2 flex rounded-md bg-green-500 px-3 py-1"
            >
                <p className="m-auto">download</p>
            </a>
        </div>
    );
}
