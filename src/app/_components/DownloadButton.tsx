import Image from "next/image";

export default function DownloadButton(props: { url: string }) {
    return (
        <div className="group">
            <a
                href={props.url}
                className="my-auto mr-2 flex h-10 rounded-md bg-cyan-500 px-2 transition-all hover:bg-cyan-600 active:bg-cyan-400"
            >
                <Image
                    src={"/download-svgrepo-com.svg"}
                    width="40"
                    height="1"
                    alt="Download sound"
                    className="p-2"
                />
            </a>
            <div className="pointer-events-none absolute -ml-12 mt-1 scale-0 rounded-md bg-zinc-600 px-3 py-1 text-white transition-all group-hover:scale-100">
                <p>Download Sound</p>
            </div>
        </div>
    );
}
