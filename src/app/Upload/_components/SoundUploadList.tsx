"use client";

import { useFileContext } from "./FilesContext";
import SoundToUpload from "./SoundToUpload";

export default function SoundsUploadList() {
    const { files, setFiles } = useFileContext();

    return (
        <div className="flex">
            <div className="m-auto">
                {files?.map((_, key) => (
                    <SoundToUpload index={key} key={key} />
                ))}
            </div>
        </div>
    );
}
