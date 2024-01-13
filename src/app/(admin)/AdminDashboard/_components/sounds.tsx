"use client";
import { api } from "~/trpc/react";
import AdminSoundsTable from "./AdminSoundsTable";

export default function SoundList(props: { url: string }) {
    const s = api.admin.getSounds.useQuery();

    return (
        <>
            <AdminSoundsTable url={props.url} sounds={s.data} />
        </>
    );
}
