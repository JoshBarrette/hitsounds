import Link from "next/link";
import { RecentlyPlayedSound } from "../_actions/playHistory";
import { cookies } from "next/headers";

export default function Footer() {
    const historyCookie = cookies().get("history");

    const history: RecentlyPlayedSound[] | null = historyCookie
        ? JSON.parse(historyCookie.value)
        : null;

    return (
        <div className="bottom-0 my-10 w-full items-center text-center text-white">
            <div className="mb-2 flex">
                <hr className="mx-auto w-48" />
            </div>

            <div className="flex">
                <div className="mx-auto flex space-x-10 text-lg">
                    <div className="flex flex-col space-y-2 text-left">
                        <Link href={"/HowToInstall"}>
                            How to Install Sounds
                        </Link>

                        <Link href="https://github.com/JoshBarrette/hitsounds">
                            GitHub
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-0 text-left">
                        <p className="mb-2">Recently Played Sounds</p>
                        {history ? (
                            history.map((historyItem, key) => (
                                <Link href={`/s/${historyItem.id}`} key={key}>
                                    {historyItem.title}
                                </Link>
                            ))
                        ) : (
                            <p>
                                <i>None</i>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
