"use server";
import { cookies } from "next/headers";

export type RecentlyPlayedSound = {
    title: string;
    id: number;
};

export async function updateHistory(sound: RecentlyPlayedSound) {
    const cookieStore = cookies();
    const historyCookie = cookieStore.get("history");

    if (!historyCookie) {
        cookieStore.set(
            "history",
            JSON.stringify([{ title: sound.title, id: sound.id }])
        );
        return;
    }
    const history = JSON.parse(historyCookie.value) as RecentlyPlayedSound[];

    let newHistory: RecentlyPlayedSound[];
    if (history.length === 5) {
        newHistory = [
            { title: sound.title, id: sound.id },
            ...history.slice(0, -1),
        ];
    } else {
        newHistory = [{ title: sound.title, id: sound.id }, ...history];
    }

    cookieStore.set("history", JSON.stringify(newHistory));
}
