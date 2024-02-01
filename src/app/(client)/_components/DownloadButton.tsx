import Image from "next/image";

export default function DownloadButton(props: { url: string }) {
    return (
        <div className="group relative whitespace-nowrap">
            <a
                href={props.url}
                className="my-auto flex h-10 rounded-md bg-neutral-400 px-2 transition-all"
            >
                <Image
                    src={"/download-svgrepo-com.svg"}
                    width="40"
                    height="1"
                    alt="Download sound"
                    className="p-2"
                />
            </a>
            <div className="pointer-events-none absolute right-1/2 z-30 mt-1 translate-x-1/2 scale-0 rounded-md bg-zinc-600 px-3 py-1 text-white transition-all group-hover:scale-100">
                <p>Download Sound</p>
            </div>
        </div>
    );
}
