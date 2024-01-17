"use client";
import { api } from "~/trpc/react";

export default function UserList() {
    const users = api.admin.getUsers.useQuery();

    return (
        <div>
            {users.data?.map((u, k) => (
                <div key={k}>
                    <p>userID: {u.userID}</p>
                </div>
            ))}
        </div>
    );
}
