"use client";
import { redirect, usePathname } from "next/navigation";
import { NavButton } from "~/app/_components/NavButton";
import { api } from "~/trpc/react";

export default function NavBar() {
    const isAdmin = api.admin.isAdmin.useQuery();
    const path = usePathname().split("/AdminDashboard/")[1];

    if (!isAdmin.isLoading && !isAdmin.data) {
        redirect("/");
    }

    return (
        <div className="flex w-full justify-center bg-neutral-800">
            <nav className="container flex text-center ">
                <div className="flex flex-grow">
                    <NavButton href="/AdminDashboard">
                        Admin Dashboard
                    </NavButton>
                    <NavButton
                        active={path === "Users"}
                        href="/AdminDashboard/Users"
                    >
                        Uploaders
                    </NavButton>
                    <NavButton
                        active={path === "Sounds"}
                        href="/AdminDashboard/Sounds"
                    >
                        Sounds
                    </NavButton>
                </div>

                <NavButton href="/">Back to Home</NavButton>
            </nav>
        </div>
    );
}
