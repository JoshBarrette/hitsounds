import { api } from "~/trpc/server";
import HomePageFilter from "./_components/HomePageFilter";
import HomePageSearchBar from "./_components/HomePageSearchBar";
import SoundsTable from "./_components/SoundsTable";

export default async function Home() {
    const searcher = await api.search.search.query({
        sortBy: "new",
        count: 50,
    });

    return (
        <div className="flex w-full flex-col">
            <div className="mx-auto w-full">
                <div className="w-full flex-col py-72">
                    <h3 className="m-auto text-center text-5xl font-medium text-white">
                        hitsounds
                    </h3>
                    <p className="m-auto text-center text-xl font-medium text-white">
                        Hitsounds and Killsounds for Team Fortress 2
                    </p>
                    <HomePageSearchBar />
                </div>
                <p className="w-full p-4 text-center text-3xl font-medium text-white">
                    Most Recent Uploads
                </p>
            </div>
            <div className="mx-auto">
                <div className="mb-2 w-full">
                    <HomePageFilter />
                </div>
                <SoundsTable sounds={searcher} />
            </div>
        </div>
    );
}
