"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { FormEvent, createRef } from "react";
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

    return (
        <>
            <div className="z-30 flex w-full bg-neutral-800">
                <nav className="mx-auto flex w-3/5 sm:w-full xl:w-3/5">
                    <div className="my-auto flex w-80 text-left">
                        <div className="mr-auto text-3xl transition-all">
                            <NavButton href="/">hitsounds</NavButton>
                        </div>
                    </div>

                    <form
                        onSubmit={handleFormSubmit}
                        className="my-auto ml-auto flex w-2/5 text-center"
                    >
                        <TextInput
                            ref={inputRef}
                            placeholder="search"
                            className="rounded-r-none"
                        />
                        <SearchButton className="h-8" width={25} type="submit" />
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
