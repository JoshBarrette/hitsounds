import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full bg-indigo-900">
            <nav className="flex">
                <div className="my-auto bg-indigo-950 p-2 transition-all">
                    <Link href="/">
                        <h1 className="text-3xl text-white">...hitsounds</h1>
                    </Link>
                </div>

                <div className="ml-20 p-2 transition-all">
                    <Link href="/upload">
                        <p className="text-2xl text-white">upload...</p>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
