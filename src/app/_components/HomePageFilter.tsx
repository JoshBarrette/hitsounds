"use client";

import { useRouter } from "next/navigation";

export default function HomePageFilter() {
    const router = useRouter();

    return (
        <div className="text-center text-white grid grid-cols-5 space-x-3">
            <button
                onClick={() => router.push(`/Search`)}
                className="default-button"
            >
                All Sounds
            </button>
            <button
                onClick={() => router.push(`/Search?type=hit`)}
                className="default-button"
            >
                All Hitsounds
            </button>
            <button
                onClick={() => router.push(`/Search?type=kill`)}
                className="default-button"
            >
                All Killsounds
            </button>
            <button
                onClick={() => router.push(`/Search`)}
                className="default-button"
            >
                Newest Sounds
            </button>
            <button
                onClick={() => router.push(`/Search?sortBy=old`)}
                className="default-button"
            >
                Oldest Sounds
            </button>
        </div>
    );
}
