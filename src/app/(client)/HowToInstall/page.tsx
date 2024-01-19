import Image from "next/image";

export default function HowToInstall() {
    return (
        <div className="my-4 min-h-screen text-center text-xl text-white">
            <p className="text-3xl">
                How to Install Custom TF2 Hitsounds/Killsounds
            </p>
            <p className="mt-2">
                Navigate to <b>tf\custom\custom_sounds\sound\ui</b> and place
                your sounds here.
            </p>
            <p>
                Your hitsound must be named hitsound and your killsound must be
                name killsound.
            </p>
            <p className="mt-5 text-center">Example:</p>
            <div className="flex w-full">
                <div className="mx-auto">
                    <Image
                        src={"/placement.png"}
                        alt="Example of where to place sounds"
                        width="991"
                        height="355"
                    />
                </div>
            </div>
            <a href="https://wiki.teamfortress.com/wiki/Hit_Sound">
                <div className="mx-auto mt-2 w-48 rounded-md py-2 transition-all hover:bg-cyan-500 hover:text-black">
                    More Information
                </div>
            </a>
        </div>
    );
}
