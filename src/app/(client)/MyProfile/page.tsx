import { UserProfile } from "@clerk/nextjs";

export default function MyProfile() {
    return (
        <div className="flex">
            <div className="mx-auto mt-10">
                <UserProfile />
            </div>
        </div>
    );
}
