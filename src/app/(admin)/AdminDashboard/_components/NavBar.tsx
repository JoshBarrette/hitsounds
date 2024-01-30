"use client";
import { redirect, useRouter } from "next/navigation";
import { NavButton } from "~/app/_components/NavButton";
import { api } from "~/trpc/react";

export default function NavBar() {
    const isAdmin = api.admin.isAdmin.useQuery();

    if (!isAdmin.isLoading && !isAdmin.data) {
        redirect("/");
    }

    return (
        <nav className="flex bg-neutral-800 text-center">
            <p className="bg-white p-2 text-3xl text-black">Admin Dashboard</p>

            <NavButton href="/AdminDashboard/Users">Uploaders</NavButton>
            <NavButton href="/AdminDashboard/Sounds">Sounds</NavButton>
            <NavButton href="/" className="absolute right-0">
                Back to Home
            </NavButton>
        </nav>
    );
}
