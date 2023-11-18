"use client";

import { useState } from "react";
import Uploader from "./_components/Uploader";
import SoundToUpload from "./_components/SoundToUpload";

export type soundData = {
    type: "hit" | "kill";
    name: string;
};

export default function Upload() {
    // TODO: combine these arrays by adding file to soundData
    const [files, setFiles] = useState<Array<File>>(new Array<File>(0));
    const [data, setData] = useState<Array<soundData>>(new Array<soundData>(0));

    return (
        <div className="flex">
            <div className="mx-auto">
                <Uploader
                    files={files}
                    setFiles={setFiles}
                    data={data}
                    setData={setData}
                />

                <div>
                    {files?.map((_, key) => (
                        <SoundToUpload file={files[key]} data={data[key]} key={key} />
                    ))}
                </div>
            </div>
        </div>
    );
}
