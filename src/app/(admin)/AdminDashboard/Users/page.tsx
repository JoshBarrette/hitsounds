import { getBaseUrl } from "~/trpc/shared";
import UsersList from "./_components/UsersList";

export default function UserList() {
    return (
        <div className="h-full max-h-full w-full">
            <UsersList url={getBaseUrl()} />
        </div>
    );
}
