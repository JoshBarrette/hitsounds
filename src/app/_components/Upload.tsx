"use client";

import { ChangeEvent } from "react";
import { trpc } from "../_trpc/client";

export default function Upload() {
    let upload = trpc.files.upload.useMutation();
    
    // TODO: verify the files
    async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) return; // Show an error window maybe
        if (e.target.files.item(0) === null) return;
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            console.log(files.item(i));
        }
        let t = upload.mutate({
            soundName: "name",
            soundType: "type",
            soundUploader: "uploader",
            soundDescription: null,
        });
        console.log(t);
    }

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
}
