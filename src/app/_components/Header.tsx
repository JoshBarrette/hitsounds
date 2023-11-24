"use client";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const user = useUser();
    const [showSignInWindow, setShowSignInWindow] = useState(false);

    useEffect(() => {
        if (showSignInWindow) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "visible";
        };
    }, [showSignInWindow]);

    return (
        <>
            <div className="w-full bg-indigo-900">
                <nav className="flex">
                    <button className="my-auto">
                        <Link href="/">
                            <h1 className="bg-indigo-950 p-2 text-3xl text-white">
                                ...hitsounds
                            </h1>
                        </Link>
                    </button>

                    <div className="my-auto ml-20">
                        {user.isSignedIn ? (
                            <div className="flex">
                                <div className="my-auto ml-20">
                                    <Link href="/upload">
                                        <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                            upload
                                        </p>
                                    </Link>
                                </div>
                                <div className="my-auto ml-5">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </div>
                        ) : (
                            <div className="my-auto">
                                <button
                                    onClick={() => setShowSignInWindow(true)}
                                >
                                    <p className="cursor-pointer rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                        sign in to upload
                                    </p>
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {showSignInWindow ? (
                <>
                    <div className="fixed flex h-screen w-screen bg-neutral-900 opacity-40" />
                    <div
                        className="fixed flex h-3/4 w-screen"
                        onClick={() => setShowSignInWindow(false)}
                    >
                        <div className="m-auto">
                            <SignIn />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
