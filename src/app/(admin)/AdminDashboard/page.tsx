import { getBaseUrl } from "~/trpc/shared";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
    return <AdminDashboard url={getBaseUrl()}/>;
}
