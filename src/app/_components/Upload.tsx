"use client";

import { ChangeEvent, useState } from "react";
import { trpc } from "../_trpc/client";
import { uploadAction } from "../actions/uploadAction";

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    let upload = trpc.files.upload.useMutation();

    // TODO: verify the files
    async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null) return; // Show an error window maybe
        if (e.target.files.item(0) === null) return;
        const files = e.target.files;
        // for (let i = 0; i < files.length; i++) {
        //     console.log(files.item(i));
        // }
        // let t = upload.mutate({
        //     soundName: "name",
        //     soundType: "type",
        //     soundUploader: "uploader",
        //     soundDescription: null,
        // });
        // console.log(t);
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(file);
                }}
            >
                <input
                    type="file"
                    onChange={(e) => {
                        if (
                            e.target.files === null ||
                            e.target.files.item(0) === null
                        ) {
                            setFile(null);
                            return;
                        }
                        setFile(e.target.files.item(0));
                        console.log(e.target.files.item(0));
                    }}
                />
            </form>

            <button type="submit">Submit</button>
        </div>
    );
}
