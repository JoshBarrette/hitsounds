"use client";

import Uploader from "./_components/Uploader";
import FilesContextProvider from "./_components/FilesContext";
import SoundsUploadList from "./_components/SoundUploadList";

export type fileData = {
    file: File;
    type: "hit" | "kill";
    name: string;
    description?: string;
};

export default function Upload() {
    return (
        <div className="flex">
            <div className="mx-auto">
                <FilesContextProvider>
                    <Uploader />
                    <SoundsUploadList />
                </FilesContextProvider>
            </div>
        </div>
    );
}
