"use client";

import { useState } from "react";
import Uploader from "./_components/Uploader";
import SoundToUpload from "./_components/SoundToUpload";

export type fileData = {
    file: File;
    type: "hit" | "kill";
    name: string;
    description?: string
};

export default function Upload() {
    const [files, setFiles] = useState<Array<fileData>>(new Array<fileData>());

    return (
        <div className="flex">
            <div className="mx-auto">
                <Uploader files={files} setFiles={setFiles} />

                <div>
                    {files?.map((_, key) => (
                        <SoundToUpload files={files} index={key} key={key} />
                    ))}
                </div>
            </div>
        </div>
    );
}
