import { getBaseUrl } from "~/trpc/shared";
import Search from "./Search";

export default function SearchPage() {
    return (
        <Search url={getBaseUrl()} />
    )
}