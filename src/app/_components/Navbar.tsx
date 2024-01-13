"use client";
import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, createRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

function UserDopDown() {
    const user = useUser();
    const router = useRouter();
    const userIsAdmin = api.admin.isAdmin.useQuery().data;

    function DropDownLink(props: { text: string; href: string }) {
        return (
            <Link href={props.href}>
                <p className="w-full rounded-md px-2 py-1 transition-all hover:bg-cyan-600">
                    {props.text}
                </p>
            </Link>
        );
    }

    return (
        <div className="group relative my-auto ml-auto h-full px-3 text-lg font-medium text-white hover:text-black">
            <img src={user.user?.imageUrl} className="h-10 w-10 rounded-full" />
            <div className="absolute right-0 z-40 scale-0 group-hover:scale-100">
                <div className="mt-2 rounded-md bg-cyan-500 p-2">
                    <Link href={"/MyProfile"}>
                        <div className="flex rounded-md bg-cyan-600 p-2">
                            <img
                                src={user.user?.imageUrl}
                                className="ml-4 h-8 w-8 rounded-full"
                            />
                            <p className="my-auto w-44 truncate text-center px-2">
                                {user.user?.username}
                            </p>
                        </div>
                    </Link>

                    <DropDownLink text="Upload" href="/Upload" />
                    <DropDownLink text="My Uploads" href="/MyUploads" />

                    {userIsAdmin && (
                        <DropDownLink
                            text="Admin Dashboard"
                            href="/AdminDashboard"
                        />
                    )}

                    <SignOutButton>
                        <p
                            onClick={() => router.push("/")}
                            className="w-full cursor-pointer rounded-md px-2 py-1 transition-all hover:bg-cyan-600"
                        >
                            Sign Out
                        </p>
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
                            <Link href="/">
                                <h1 className="p-2">hitsounds</h1>
                            </Link>
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

                    <div className="my-auto ml-auto w-80">
                        <SignedIn>
                            <div className="flex sm:ml-5">
                                <div className="sm:w-4 xl:w-0" />
                                <UserDopDown />
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <div className="my-auto flex">
                                <Link href="/SignIn" className="ml-auto">
                                    <button className="my-auto ml-auto h-full px-3 py-2.5 text-2xl text-white transition-all hover:bg-cyan-500 hover:text-black active:bg-cyan-400">
                                        sign in
                                    </button>
                                </Link>
                            </div>
                        </SignedOut>
                    </div>
                </nav>
            </div>
        </>
    );
}
