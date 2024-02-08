"use client";
import { useRouter } from "next/navigation";
import { createRef } from "react";
import { SearchButton } from "~/app/_components/SearchButton";
import { TextInput } from "~/app/_components/TextInput";

export default function HomePageSearchBar() {
    const router = useRouter();
    const inputRef = createRef<HTMLInputElement>();

    return (
        <div className="mx-auto mt-10">
            <form
                className="mx-auto flex text-center"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!inputRef.current?.value) {
                        return;
                    }

                    router.push(`/Search?q=${inputRef.current?.value ?? ""}`);
                }}
            >
                <div className="flex w-full">
                    <div className="mx-auto flex w-1/3">
                        <TextInput
                            ref={inputRef}
                            placeholder="search"
                            className="my-auto w-full rounded-l-3xl rounded-r-none text-xl leading-10"
                        />
                        <SearchButton
                            width={34}
                            type="submit"
                            className="my-auto rounded-r-3xl"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
