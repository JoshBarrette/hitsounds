import Image from "next/image";

export default function CopyLinkButton(props: {
    url: string;
    soundID: number;
}) {
    return (
        <div className="group">
            <div
                className="hover:cursor-pointer"
                onClick={() =>
                    navigator.clipboard.writeText(
                        `${props.url}/s/${props.soundID}`
                    )
                }
            >
                <Image
                    src={"/copy.png"}
                    width="40"
                    height="1"
                    alt="Copy link to sound"
                />
            </div>
            <div className="absolute -ml-16 mt-1 scale-0 rounded-md bg-zinc-600 px-3 py-1 text-white transition-all group-hover:scale-100">
                <p>Copy Link to Sound</p>
            </div>
        </div>
    );
}
