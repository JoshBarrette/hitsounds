"use client";

import { useUser } from "@clerk/nextjs";

export default function ProfileHeader() {
    const user = useUser();

    return (
        <div className="flex">
            <div className="m-auto flex">
                <img src={user.user?.imageUrl} className="rounded-full mr-8 my-10" />
                <p className="my-auto text-4xl font-medium text-white">
                    {user.user?.fullName}'s Uploads
                </p>
            </div>
        </div>
    );
}
