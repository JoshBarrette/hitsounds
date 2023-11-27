"use client";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, createRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const user = useUser();
    const [showSignInWindow, setShowSignInWindow] = useState(false);
    const inputRef = createRef<HTMLInputElement>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (showSignInWindow) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "visible";
        };
    }, [showSignInWindow]);

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/Search?keywords=${inputRef.current?.value}`);
        router.refresh();
    }

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

                    {!pathname.startsWith("/search") ? (
                        <form
                            onSubmit={handleFormSubmit}
                            className="ml-4 mt-1.5 text-center"
                        >
                            <input
                                type="text"
                                ref={inputRef}
                                placeholder="...search"
                                className="mb-2 w-32 rounded-sm bg-blue-300 text-center leading-8 text-black placeholder:text-neutral-500"
                            />
                            <button
                                type="submit"
                                className="ml-2 rounded-md bg-red-300 px-3 py-2"
                            >
                                Search
                            </button>
                        </form>
                    ) : null}

                    <div className="my-auto ml-20">
                        {user.isSignedIn ? (
                            <div className="flex">
                                <div className="my-auto ml-5">
                                    <Link href="/Upload">
                                        <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                            upload
                                        </p>
                                    </Link>
                                </div>
                                <div className="my-auto ml-5">
                                    <Link href="/MyUploads">
                                        <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                            my uploads
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
