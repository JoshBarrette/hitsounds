"use client";
import { useSearchParams } from "next/navigation";
import { FormEvent, createRef, useState } from "react";
import { Button } from "~/app/_components/Button";
import { Option, Select } from "~/app/_components/Select";
import { TextInput } from "~/app/_components/TextInput";
import { api } from "~/trpc/react";

export default function UsersList(props: { url: string }) {
    const inputRef = createRef<HTMLInputElement>();
    const sortRef = createRef<HTMLSelectElement>();

    const [sortBy, setSortBy] = useState<string>(
        sortRef.current?.value ?? "new"
    );
    const [userID, setUserID] = useState<string | undefined>(
        inputRef.current?.value ?? undefined
    );
    const [page, setPage] = useState<number>(1);

    const searchParams = useSearchParams();
    const userIDParam = parseInt(searchParams.get("u") ?? "");
    const [currentUserID, setCurrentUserID] = useState(userIDParam);

    const s = api.admin.searchUsers.useQuery({
        userID,
        sortBy,
        page,
    });
    const p = api.admin.searchUsersPageCount.useQuery({
        userID,
    });

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSortBy(sortRef.current?.value ?? "new");
        setUserID(inputRef.current?.value);
    }

    return (
        <div className="flex h-full flex-col items-center text-white">
            <form onSubmit={handleFormSubmit} className="my-2 text-center">
                <TextInput
                    type="text"
                    ref={inputRef}
                    placeholder="userID"
                    className="mr-2 w-96"
                />
                <label htmlFor="sortByInput" className="mr-2">
                    sort by:
                </label>
                <Select
                    id="sortByInput"
                    name="sortByInput"
                    ref={sortRef}
                    defaultValue={"new"}
                >
                    <Option value="new">new</Option>
                    <Option value="old">old</Option>
                </Select>
                <br />
                <Button type="submit" className="mt-2">
                    Filter
                </Button>
            </form>

            {JSON.stringify(s.data)}
        </div>
    );
}
