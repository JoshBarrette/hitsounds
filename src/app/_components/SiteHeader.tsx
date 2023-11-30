"use client";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, createRef, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SiteHeader() {
    const user = useUser();
    const [showSignInWindow, setShowSignInWindow] = useState<boolean>(false);
    const inputRef = createRef<HTMLInputElement>();
    const router = useRouter();

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
            <div className="z-30 flex w-full bg-indigo-900">
                <nav className=" mx-auto flex w-3/5 sm:w-full xl:w-3/5">
                    <div className="my-auto flex w-80 text-left">
                        <div
                            className={`mr-auto ${
                                showSignInWindow ? "pointer-events-none" : ""
                            }`}
                        >
                            <Link href="/">
                                <h1 className="p-2 text-3xl text-white">
                                    ...hitsounds
                                </h1>
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
                            placeholder="...search"
                            className="my-auto mb-2 w-full rounded-sm bg-blue-300 text-center leading-8 text-black placeholder:text-neutral-500"
                            disabled={showSignInWindow}
                        />
                        {/* <button
                                type="submit"
                                className="ml-2 rounded-md bg-red-300 px-3 py-2"
                            >
                                Search
                            </button> */}
                    </form>

                    <div className="my-auto ml-auto w-80">
                        {user.isSignedIn ? (
                            <div className="flex sm:ml-5">
                                <div className="my-auto ml-auto">
                                    <Link href="/Upload">
                                        <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                            upload
                                        </p>
                                    </Link>
                                </div>
                                <div className="my-auto ml-auto">
                                    <Link href="/MyUploads">
                                        <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                            uploads
                                        </p>
                                    </Link>
                                </div>
                                <div className="my-auto ml-auto">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                                <div className="sm:w-4 xl:w-0" />
                            </div>
                        ) : (
                            <div className="my-auto flex">
                                <button
                                    onClick={() => setShowSignInWindow(true)}
                                    className="ml-auto"
                                    disabled={showSignInWindow}
                                >
                                    <p className="rounded-md bg-blue-300 px-3 py-1 text-2xl text-white">
                                        sign in
                                    </p>
                                </button>
                                <div className="sm:w-3 xl:w-0" />
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {showSignInWindow && (
                <>
                    <div className="fixed z-40 flex h-screen w-screen bg-neutral-900 opacity-40" />
                    <div
                        className="fixed z-50 flex h-3/4 w-screen"
                        onClick={() => setShowSignInWindow(false)}
                    >
                        <div className="m-auto">
                            <SignIn />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
