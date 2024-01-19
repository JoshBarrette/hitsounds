"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/Button";

export default function HomePageFilter() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-5 space-x-3 text-center text-white">
            <Link href="/Search">
                <Button className="w-full">All Sounds</Button>
            </Link>

            <Link href="/Search?type=hit">
                <Button className="w-full">All Hitsounds</Button>
            </Link>

            <Link href="/Search?type=kill">
                <Button className="w-full">All Killsounds</Button>
            </Link>

            <Link href="/Search">
                <Button className="w-full">Newest Sounds</Button>
            </Link>

            <Link href="/Search?sortBy=old">
                <Button className="w-full">Oldest Sounds</Button>
            </Link>
        </div>
    );
}
