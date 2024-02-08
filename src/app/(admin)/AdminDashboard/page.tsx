"use client";
import Link from "next/link";
import { Button } from "~/app/_components/Button";
import { api } from "~/trpc/react";

export default function AdminPage() {
    const soundCount = api.admin.totalSounds.useQuery();
    const userCount = api.admin.totalUsers.useQuery();

    return (
        <div className="flex h-full">
            <div className="m-auto flex space-x-10">
                <DataCard
                    type={"Users"}
                    data={userCount.data ?? 0}
                    href={"/AdminDashboard/Users"}
                />
                <DataCard
                    type={"Sounds"}
                    data={soundCount.data ?? 0}
                    href={"/AdminDashboard/Sounds"}
                />
            </div>
        </div>
    );
}

function DataCard(props: { type: string; data: number; href: string }) {
    return (
        <div className="flex flex-col space-y-5 border rounded-xl px-12 py-8">
            <h1 className="mx-auto text-3xl text-white">
                Total {props.type}: {props.data}
            </h1>

            <Link href={props.href} className="mx-auto">
                <Button>View {props.type}</Button>
            </Link>
        </div>
    );
}
