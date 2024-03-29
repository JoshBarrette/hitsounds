import ProfileSoundsTable from "./_components/ProfileSoundsTable";
import ProfileHeader from "./_components/ProfileHeader";

export default function MyUploads() {
    return (
        <div className="flex">
            <div className="mx-auto">
                <ProfileHeader />
                <ProfileSoundsTable />
            </div>
        </div>
    );
}
