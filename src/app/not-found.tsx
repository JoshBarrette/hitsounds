import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex-box mt-10 w-screen text-center text-white">
            <p className="m-auto w-screen text-6xl">404 not found</p>
            <div className="mx-auto mt-10 w-36 rounded-sm transition-all hover:bg-cyan-500 hover:text-black">
                <Link href="/">
                    <h1 className="p-2 text-3xl">...home</h1>
                </Link>
            </div>
        </div>
    );
}
