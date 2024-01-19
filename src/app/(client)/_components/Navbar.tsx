"use client";
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, createRef, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Image from "next/image";
import { NavButton } from "~/app/_components/NavButton";
import { cn } from "~/utils";

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
                    "w-full px-2 py-1 text-left transition-all hover:bg-cyan-600",
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

function UserDopDown() {
    const user = useUser();
    const router = useRouter();
    const userIsAdmin = api.admin.isAdmin.useQuery().data;

    return (
        <div className="group relative my-auto ml-auto h-full px-3 text-lg font-medium hover:text-black">
            <Image
                src={user.user?.imageUrl ?? ""}
                className="rounded-full"
                alt="pfp"
                width="40"
                height="1"
            />
            <div className="absolute right-0 z-40 scale-0 group-hover:scale-100">
                <div className="mt-2 bg-cyan-500">
                    <Link href={"/MyProfile"} className="mb-2">
                        <div className="flex bg-cyan-500 p-2 hover:bg-cyan-600">
                            <Image
                                src={user.user?.imageUrl ?? ""}
                                className="ml-4 rounded-full"
                                alt="pfp"
                                width="35"
                                height="1"
                            />
                            <p className="my-auto w-44 truncate px-2 text-center">
                                {user.user?.username}
                            </p>
                        </div>
                    </Link>

                    <DropDownButton href="/Upload">Upload</DropDownButton>
                    <DropDownButton href="/MyUploads">
                        My Uploads
                    </DropDownButton>

                    {userIsAdmin && (
                        <DropDownButton href="/AdminDashboard">
                            Admin Dashboard
                        </DropDownButton>
                    )}

                    <SignOutButton>
                        <DropDownButton onClick={() => router.push("/")}>
                            Sign Out
                        </DropDownButton>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const inputRef = createRef<HTMLInputElement>();
    const router = useRouter();

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/Search?k=${inputRef.current?.value}`);
        router.refresh();
    }

    return (
        <>
            <div className="z-30 flex w-full bg-neutral-800">
                <nav className="mx-auto flex w-3/5 sm:w-full xl:w-3/5">
                    <div className="my-auto flex w-80 text-left">
                        <div className="mr-auto text-3xl text-white transition-all hover:bg-cyan-500 hover:text-black">
                            <NavButton href="/">hitsounds</NavButton>
                        </div>
                    </div>

                    <form
                        onSubmit={handleFormSubmit}
                        className="ml-auto mt-2.5 w-2/5 text-center"
                    >
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="search"
                            className="my-auto mb-2 w-full rounded-sm bg-cyan-900 text-center leading-8 text-white placeholder:text-neutral-200"
                        />
                    </form>

                    <div className="my-auto ml-auto flex w-80">
                        <div className="ml-auto">
                            <SignedIn>
                                <div className="flex sm:ml-5">
                                    <div className="sm:w-4 xl:w-0" />
                                    <UserDopDown />
                                </div>
                            </SignedIn>

                            <SignedOut>
                                <NavButton href="/SignIn">Sign In</NavButton>
                            </SignedOut>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
