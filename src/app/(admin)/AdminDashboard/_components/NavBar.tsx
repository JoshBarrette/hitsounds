"use client";
import { redirect, usePathname, useRouter } from "next/navigation";
import { NavButton } from "~/app/_components/NavButton";
import { api } from "~/trpc/react";

export default function NavBar() {
    const isAdmin = api.admin.isAdmin.useQuery();
    const path = usePathname().split("/AdminDashboard/")[1];

    if (!isAdmin.isLoading && !isAdmin.data) {
        redirect("/");
    }

    return (
        <nav className="flex bg-neutral-800 text-center">
            <NavButton href="/AdminDashboard">Admin Dashboard</NavButton>

            <NavButton inactive={path !== "Users"} href="/AdminDashboard/Users">
                Uploaders
            </NavButton>
            <NavButton
                inactive={path !== "Sounds"}
                href="/AdminDashboard/Sounds"
            >
                Sounds
            </NavButton>
            <NavButton href="/" className="absolute right-0">
                Back to Home
            </NavButton>
        </nav>
    );
}
