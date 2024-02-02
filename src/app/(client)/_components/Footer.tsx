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
                <hr className="mx-auto w-36" />
            </div>

            <div className="flex">
                <div className="mx-auto flex space-x-10 text-lg">
                    <div className="flex flex-col text-left">
                        <Link href={"/HowToInstall"}>
                            How to Install Sounds
                        </Link>

                        <a href="https://github.com/JoshBarrette/hitsounds">
                            GitHub
                        </a>
                    </div>

                    {historyCookie && (
                        <div className="flex flex-col text-left">
                            <p className="mb-2">Recently Played Sounds</p>
                            {history?.map((historyItem, key) => {
                                return (
                                    <Link
                                        href={`/s/${historyItem.id}`}
                                        key={key}
                                    >
                                        {historyItem.title}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
