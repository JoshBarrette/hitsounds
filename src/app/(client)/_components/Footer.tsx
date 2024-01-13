import Link from "next/link";

export default function Footer() {
    return (
        <div className="relative bottom-0 my-10 w-full items-center text-center text-white">
            <div className="flex mb-2">
                <hr className="mx-auto w-36" />
            </div>
            <Link href={"/HowToInstall"}>
                <p className="text-lg">How to Install Sounds</p>
            </Link>
        </div>
    );
}
