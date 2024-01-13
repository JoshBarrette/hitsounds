"use client";
import { useState } from "react";
import UserList from "./_components/users";
import Link from "next/link";
import SoundList from "./_components/sounds";

export default function AdminDashboard() {
    const [currentFilter, setCurrentFilter] = useState<"uploaders" | "sounds">(
        "uploaders"
    );

    function switcher() {
        switch (currentFilter) {
            case "uploaders":
                return <UserList />;
            case "sounds":
                return <SoundList url={""} />;
            default:
                return null;
        }
    }

    return (
        <div className="h-screen text-2xl text-white">
            <nav className="absolute h-screen w-40 bg-neutral-800 text-center">
                <p className="w-full p-2">Admin Dash</p>
                <button
                    className="w-full p-2 transition-all hover:bg-cyan-500 hover:text-black"
                    onClick={() => setCurrentFilter("uploaders")}
                >
                    Uploaders
                </button>
                <br />
                <button
                    className="w-full p-2 transition-all hover:bg-cyan-500 hover:text-black"
                    onClick={() => setCurrentFilter("sounds")}
                >
                    Sounds
                </button>
                <div className="absolute bottom-0 w-full transition-all hover:bg-cyan-500 hover:text-black">
                    <Link href="/">
                        <h1 className="p-2">Home Page</h1>
                    </Link>
                </div>
            </nav>
            <div className="flex">
                <div className="h-full w-40" id="navbarSpacer" />
                <div>
                    <p className="text-center">
                        filtering here??? maybe move this into the list
                        components
                    </p>

                    {switcher()}
                </div>
            </div>
        </div>
    );
}
