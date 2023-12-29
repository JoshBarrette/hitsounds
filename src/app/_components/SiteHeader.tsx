"use client";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FormEvent, createRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        router.push(`/Search?k=${inputRef.current?.value}`);
        router.refresh();
    }

    return (
        <>
            <div className="z-30 flex w-full bg-neutral-800">
                <nav className=" mx-auto flex w-3/5 sm:w-full xl:w-3/5">
                    <div className="my-auto flex w-80 text-left">
                        <div
                            className={`mr-auto text-white transition-all hover:bg-cyan-500 hover:text-black ${
                                showSignInWindow ? "pointer-events-none" : ""
                            }`}
                        >
                            <Link href="/">
                                <h1 className="p-2 text-3xl">...hitsounds</h1>
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
                                <Link href="/Upload">
                                    <div className="my-auto ml-auto h-full px-3 py-2.5 text-2xl text-white transition-all hover:bg-cyan-500 hover:text-black active:bg-cyan-400">
                                        <p>upload</p>
                                    </div>
                                </Link>
                                <Link href="/MyUploads">
                                    <div className="my-auto ml-auto h-full px-3 py-2.5 text-2xl text-white transition-all hover:bg-cyan-500 hover:text-black active:bg-cyan-400">
                                        <p>uploads</p>
                                    </div>
                                </Link>
                                <div className="my-auto ml-auto">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                                <div className="sm:w-4 xl:w-0" />
                            </div>
                        ) : (
                            <div className="my-auto flex">
                                <button
                                    onClick={() => setShowSignInWindow(true)}
                                    className="my-auto ml-auto h-full px-3 py-2.5 text-2xl text-white transition-all hover:bg-cyan-500 hover:text-black active:bg-cyan-400"
                                    disabled={showSignInWindow}
                                >
                                    <p>sign in</p>
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
