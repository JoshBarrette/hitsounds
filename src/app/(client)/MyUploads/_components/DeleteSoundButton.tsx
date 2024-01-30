import Image from "next/image";

export default function DeleteSoundButton(props: {
    soundId: number;
    isDisabled: boolean;
    handleDelete: (id: number) => void;
}) {
    return (
        <div className="group">
            <button
                className="my-auto flex h-10 rounded-md bg-red-600 text-white transition-all disabled:bg-red-950 disabled:text-black"
                onClick={() => props.handleDelete(props.soundId)}
                disabled={props.isDisabled}
            >
                <Image
                    src={"/delete-svgrepo-com.svg"}
                    width="40"
                    height="1"
                    alt="Delete sound"
                    className="p-2"
                />
            </button>
            <div className="pointer-events-none absolute -ml-9 mt-1 scale-0 rounded-md bg-zinc-600 px-3 py-1 text-white transition-all group-hover:scale-100">
                <p>Delete Sound</p>
            </div>
        </div>
    );
}
