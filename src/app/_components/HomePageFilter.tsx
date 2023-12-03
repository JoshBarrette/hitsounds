"use client";

import { useRouter } from "next/navigation";
import { createRef } from "react";

export default function HomePageFilter() {
    const router = useRouter();
    const typeRef = createRef<HTMLSelectElement>();
    const sortRef = createRef<HTMLSelectElement>();

    function handleFilterClick() {
        router.push(
            `/Search?type=${typeRef.current?.value ?? "any"}` +
                `&sortBy=${sortRef.current?.value ?? "new"}`
        );
    }

    return (
        <div className="text-center text-white">
            <label htmlFor="type" className="ml-2">
                sound type:
            </label>
            <select
                id="type"
                name="type"
                className="text-md mx-2 my-auto w-28 rounded-md bg-cyan-900 p-1 font-sans font-medium"
                defaultValue={"any"}
                ref={typeRef}
            >
                <option value="any" className="font-sans font-medium">
                    all sounds
                </option>
                <option value="hit" className="font-sans font-medium">
                    hitsound
                </option>
                <option value="kill" className="font-sans font-medium">
                    killsound
                </option>
            </select>
            <label htmlFor="sortByInput" className="mr-2">
                sort by:
            </label>
            <select
                id="sortByInput"
                name="sortByInput"
                className="text-md my-auto mr-2 w-24 rounded-md bg-cyan-900 p-1 font-sans font-medium"
                defaultValue={"new"}
                ref={sortRef}
            >
                <option value="new" className="font-sans font-medium">
                    new
                </option>
                <option value="old" className="font-sans font-medium">
                    old
                </option>
                <option value="az" className="font-sans font-medium">
                    {"a->z"}
                </option>
                <option value="za" className="font-sans font-medium">
                    {"z->a"}
                </option>
            </select>
            <button
                onClick={handleFilterClick}
                className="rounded-md bg-cyan-500 px-3 py-2 text-black transition-all hover:bg-cyan-600 active:bg-cyan-400"
            >
                Filter
            </button>
        </div>
    );
}
