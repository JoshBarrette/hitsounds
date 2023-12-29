"use client";

import { useRouter } from "next/navigation";
import { DefaultButtonStyles } from "./Constants";

export default function HomePageFilter() {
    const router = useRouter();

    return (
        <div className="text-center text-white grid grid-cols-5 space-x-3">
            <button
                onClick={() => router.push(`/Search`)}
                className={DefaultButtonStyles}
            >
                All Sounds
            </button>
            <button
                onClick={() => router.push(`/Search?type=hit`)}
                className={DefaultButtonStyles}
            >
                All Hitsounds
            </button>
            <button
                onClick={() => router.push(`/Search?type=kill`)}
                className={DefaultButtonStyles}
            >
                All Killsounds
            </button>
            <button
                onClick={() => router.push(`/Search`)}
                className={DefaultButtonStyles}
            >
                Newest Sounds
            </button>
            <button
                onClick={() => router.push(`/Search?sortBy=old`)}
                className={DefaultButtonStyles}
            >
                Oldest Sounds
            </button>
        </div>
    );
}
