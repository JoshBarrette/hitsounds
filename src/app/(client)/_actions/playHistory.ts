"use server";
import { cookies } from "next/headers";

export type RecentlyPlayedSound = {
    title: string;
    id: number;
};

function setHistory(arr: RecentlyPlayedSound[]) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    cookies().set("history", JSON.stringify(arr), {
        expires: Date.now() + sevenDays,
    });
}

export async function updateHistory(sound: RecentlyPlayedSound) {
    const cookieStore = cookies();
    const historyCookie = cookieStore.get("history");

    if (!historyCookie) {
        setHistory([{ title: sound.title, id: sound.id }]);
        return;
    }

    let history = JSON.parse(historyCookie.value) as RecentlyPlayedSound[];
    if (history[0].id === sound.id) {
        return;
    }
    history = history.filter((s, i) => s.id !== sound.id);

    let newHistory: RecentlyPlayedSound[];
    if (history.length === 5) {
        newHistory = [
            { title: sound.title, id: sound.id },
            ...history.slice(0, -1),
        ];
    } else {
        newHistory = [{ title: sound.title, id: sound.id }, ...history];
    }

    setHistory(newHistory);
}
