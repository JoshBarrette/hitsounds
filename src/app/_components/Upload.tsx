"use client";

import { ChangeEvent, FormEvent, createRef, useState } from "react";
import { trpc } from "../_trpc/client";

export default function Upload() {
    const [file, setFile] = useState<File>();

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (file === undefined) return;

        let formData = new FormData();
        formData.append("file", file);
        let res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        console.log((await res.json()).data);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            setFile(undefined);
            return;
        }

        setFile(e.target.files.item(0) ?? undefined);
        console.log(e.target.files.item(0) ?? "file is undefined");
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
