"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { forwardRef } from "react";
import { cn } from "~/utils";

export default function UserDopDown() {
    const user = useUser();
    const router = useRouter();
    const userIsAdmin = api.admin.isAdmin.useQuery().data;

    return (
        <div className="group relative my-auto ml-auto h-full text-lg font-medium hover:text-black">
            {user.isLoaded && (
                <div className="p-1.5 group-hover:bg-white">
                    <Image
                        src={user.user!.imageUrl}
                        className="rounded-full"
                        alt="pfp"
                        width="40"
                        height="1"
                    />
                </div>
            )}
            <div className="absolute right-0 z-40 rounded-b-sm rounded-tl-sm scale-0 bg-white py-2 shadow-lg group-hover:scale-100">
                <Link href={"/MyProfile"} className="mb-2">
                    <div className="flex p-2 hover:bg-neutral-400">
                        {user.isLoaded && (
                            <Image
                                src={user.user!.imageUrl}
                                className="ml-4 rounded-full"
                                alt="pfp"
                                width="35"
                                height="1"
                            />
                        )}
                        <p className="my-auto w-44 truncate px-2 text-center">
                            {user.user?.username}
                        </p>
                    </div>
                </Link>

                <Spacer />

                <DropDownButton href="/Upload">Upload</DropDownButton>
                <DropDownButton href="/MyUploads">My Uploads</DropDownButton>

                {userIsAdmin && (
                    <>
                        <Spacer />
                        <DropDownButton href="/AdminDashboard">
                            Admin Dashboard
                        </DropDownButton>
                    </>
                )}

                <Spacer />

                <SignOutButton>
                    <DropDownButton onClick={() => router.push("/")}>
                        Sign Out
                    </DropDownButton>
                </SignOutButton>
            </div>
        </div>
    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: any;
    href?: string;
}
const DropDownButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, href, className, ...props }, ref) => (
        <Link href={href ?? ""}>
            <button
                ref={ref}
                className={cn(
                    "w-full px-2 py-1 text-left transition-all hover:bg-neutral-400",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        </Link>
    )
);
DropDownButton.displayName = "DropDownButton";

function Spacer() {
    return <hr className="my-2 border-t border-black" />;
}
