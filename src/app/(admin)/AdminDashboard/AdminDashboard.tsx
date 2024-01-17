"use client";
import { useState } from "react";
import UserList from "./_components/users";
import SoundsList from "./_components/SoundsList";
import { NavButton } from "~/app/_components/NavButton";

export default function AdminDashboard(props: { url: string }) {
    const [currentFilter, setCurrentFilter] = useState<"uploaders" | "sounds">(
        "uploaders"
    );

    function switcher() {
        switch (currentFilter) {
            case "uploaders":
                return <UserList />;
            case "sounds":
                return <SoundsList url={props.url} />;
            default:
                return null;
        }
    }

    return (
        <div className="h-screen w-full text-3xl text-white">
            <nav className="flex bg-neutral-800 text-center">
                <p className="bg-cyan-500 p-2 text-black">Admin Dashboard</p>
                <NavButton onClick={() => setCurrentFilter("uploaders")}>
                    Uploaders
                </NavButton>
                <NavButton onClick={() => setCurrentFilter("sounds")}>
                    Sounds
                </NavButton>
                <NavButton href="/" className="absolute right-0">
                    Back to Home
                </NavButton>
            </nav>
            <div className="flex">
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
