"use client";
import Link from "next/link";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { RecentlyPlayedSound } from "../_actions/playHistory";

export default function Footer(props: {
    historyCookie: RequestCookie | undefined;
}) {
    const history: RecentlyPlayedSound[] | null = props.historyCookie
        ? JSON.parse(props.historyCookie.value)
        : null;

    return (
        <div className="relative bottom-0 my-10 w-full items-center text-center text-white">
            <div className="mb-2 flex">
                <hr className="mx-auto w-36" />
            </div>

            {props.historyCookie && (
                <div>{history?.map((h, k) => <p key={k}>{h.title}</p>)}</div>
            )}

            <Link href={"/HowToInstall"}>
                <p className="text-lg">How to Install Sounds</p>
            </Link>
        </div>
    );
}
