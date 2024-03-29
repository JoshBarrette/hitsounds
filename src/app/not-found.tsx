import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex-box mt-10 w-full text-center text-white">
            <p className="m-auto w-full text-6xl">404 not found</p>
            <div className="mx-auto mt-10 w-48 rounded-sm transition-all hover:bg-cyan-500 hover:text-black">
                <Link href="/">
                    <h1 className="p-2 text-3xl">Go home...</h1>
                </Link>
            </div>
        </div>
    );
}
