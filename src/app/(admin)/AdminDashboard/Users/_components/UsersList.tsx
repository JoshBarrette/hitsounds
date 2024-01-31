"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, createRef, useRef, useState } from "react";
import { Button } from "~/app/_components/Button";
import PageSelector from "~/app/_components/PageSelector";
import { Option, Select } from "~/app/_components/Select";
import { TextInput } from "~/app/_components/TextInput";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";

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
    const userIDParam = searchParams.get("u");
    const [currentUserID, setCurrentUserID] = useState<string | undefined>(
        userIDParam ?? undefined
    );

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
                    defaultValue={currentUserID ?? ""}
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
                <Button type="submit" className="ml-2">
                    Filter
                </Button>
            </form>

            <div className="space-y-2">
                {s.data?.map((d, k) => (
                    <UserAccordion data={d} url={props.url} key={k} />
                ))}
            </div>

            <PageSelector
                size={p.data ?? 1}
                currentPage={page}
                setPage={setPage}
            />
        </div>
    );
}

function UserAccordion(props: {
    data: RouterOutputs["admin"]["searchUsers"][0];
    url: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    let titleDivRounding = isOpen ? "rounded-t" : "accordion-header rounded";
    let titleDivColoring = props.data.isBanned
        ? "bg-red-600 text-white"
        : "bg-white";

    return (
        <div className="overflow-hidden text-xl text-black">
            <button
                className={`flex space-x-6 px-4 py-2 ${titleDivColoring} ${titleDivRounding}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>dbID: {props.data.id}</p>
                <p>userID: {props.data.userID}</p>
            </button>

            <div
                ref={contentRef}
                className="accordion-body rounded-b bg-neutral-200"
                style={
                    isOpen
                        ? { height: contentRef.current?.scrollHeight }
                        : { height: "0px" }
                }
            >
                <div className="px-4 py-2">
                    <UserInfoTable data={props.data} />
                    <OptionButtons data={props.data} url={props.url} />
                </div>
            </div>
        </div>
    );
}

function UserInfoTable(props: {
    data: RouterOutputs["admin"]["searchUsers"][0];
}) {
    const d = new Date(props.data.createdAt);

    return (
        <table>
            <tbody>
                <tr>
                    <td className="text-neutral-600">dbID:</td>
                    <td>{props.data.id}</td>
                </tr>
                <tr>
                    <td className="text-neutral-600">UserID:</td>
                    <td>{props.data.userID}</td>
                </tr>
                <tr>
                    <td className="text-neutral-600">Uploads:</td>
                    <td>{props.data._count.uploads}</td>
                </tr>
                <tr>
                    <td className="text-neutral-600">Banned:</td>
                    <td>{props.data.isBanned ? "true" : "false"}</td>
                </tr>
                <tr>
                    <td className="text-neutral-600">Admin:</td>
                    <td>{props.data.isAdmin ? "true" : "false"}</td>
                </tr>
                <tr>
                    <td className="text-neutral-600">Created at:</td>
                    <td>
                        {d.toDateString() +
                            ", " +
                            d.toLocaleTimeString("en-US")}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function OptionButtons(props: {
    data: RouterOutputs["admin"]["searchUsers"][0];
    url: string;
}) {
    const [isBanning, setIsBanning] = useState(false);
    const ban = api.admin.banUser.useMutation({
        onSuccess: () => {
            alert("User Successfully Banned");
        },
        onError: () => {
            alert("Error When Attempting Ban User (User may be an admin)");
        },
        onSettled: () => setIsBanning(false),
    });
    const unBan = api.admin.unBanUser.useMutation({
        onSuccess: () => {
            alert("User Successfully UnBanned");
        },
        onError: () => {
            alert("Error When Attempting UnBan User");
        },
        onSettled: () => setIsBanning(false),
    });

    return (
        <div className="my-2 flex space-x-4">
            <Link
                href={`${props.url}/AdminDashboard/Sounds?u=${props.data.userID}`}
            >
                <Button className="border-neutral-400 text-black hover:border-black">
                    View Uploaded Sounds
                </Button>
            </Link>

            {isBanning ? (
                <>
                    <Button
                        className="border-none bg-red-600 text-black hover:border-none"
                        onClick={() => {
                            props.data.isBanned
                                ? unBan.mutate(props.data.id)
                                : ban.mutate(props.data.id);
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        className="border-neutral-400 text-black hover:border-black"
                        onClick={() => setIsBanning(false)}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    {props.data.isBanned ? (
                        <Button
                            className="border-none bg-red-600 text-black hover:border-none"
                            onClick={() => setIsBanning(true)}
                        >
                            UnBan User
                        </Button>
                    ) : (
                        <Button
                            className="border-none bg-red-600 text-black hover:border-none"
                            onClick={() => setIsBanning(true)}
                        >
                            Ban User
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
