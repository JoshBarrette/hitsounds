"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfileHeader() {
    const user = useUser();

    return (
        <div className="flex">
            {user.isLoaded && user.user && (
                <div className="m-auto flex">
                    <Image
                        src={user.user.imageUrl ?? ""}
                        width="150"
                        height="1"
                        alt="Copy link to sound"
                        className="my-10 mr-8 rounded-full"
                    />
                    <p className="my-auto text-4xl font-medium text-white">
                        {user.user.fullName ?? ""}
                        {"'"}s Uploads
                    </p>
                </div>
            )}
        </div>
    );
}
