"use client";

import { useFileContext } from "./FilesContext";
import SoundToUpload from "./SoundToUpload";

export default function SoundsUploadList() {
    const { files, setFiles } = useFileContext();

    return (
        <div className="flex">
            <div className="mx-auto mt-2">
                {files.length > 0 ? (
                    <div className="flex text-center text-white">
                        <div>
                            <p className="mx-8 w-96">name</p>
                        </div>
                        <div>
                            <p className="ml-4 w-32">type</p>
                        </div>
                    </div>
                ) : null}
                {files?.map((_, key) => (
                    <SoundToUpload index={key} key={key} />
                ))}
            </div>
        </div>
    );
}
