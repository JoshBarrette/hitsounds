"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { FormEvent, createRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavButton } from "~/app/_components/NavButton";
import { TextInput } from "~/app/_components/TextInput";
import { SearchButton } from "~/app/_components/SearchButton";
import UserDopDown from "./UserDopDown";

export default function Navbar() {
    const inputRef = createRef<HTMLInputElement>();
    const router = useRouter();

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!inputRef.current?.value) {
            return;
        }

        router.push(`/Search?k=${inputRef.current?.value}`);
        router.refresh();
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "k") {
            inputRef.current?.focus();
            event.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    return (
        <div className="z-30 flex w-full">
            <nav className="mx-auto flex w-full xl:w-3/5">
                <div className="my-auto flex w-80 text-left">
                    <div className="mr-auto text-3xl transition-all">
                        <NavButton href="/">hitsounds</NavButton>
                    </div>
                </div>

                <form
                    onSubmit={handleFormSubmit}
                    className="my-auto ml-auto flex flex-grow text-center"
                >
                    <TextInput
                        ref={inputRef}
                        placeholder="search"
                        className="rounded-sm rounded-r-none"
                        useShortcut
                        shortcutText="CtrlK"
                    />
                    <SearchButton
                        className="h-8 rounded-r-sm"
                        width={25}
                        type="submit"
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
    );
}
