"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../_trpc/client";

export default function Upload() {
    const [file, setFile] = useState<File>();
    let upload = trpc.files.upload.useMutation();

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (file === undefined) return;

        let formData = new FormData();
        formData.append("file", file);
        let res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        console.log(res);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) {
            setFile(undefined);
            return;
        }
        setFile(e.target.files.item(0) ?? undefined);
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
