"use client";

import Uploader from "./_components/Uploader";
import FilesContextProvider from "./_components/FilesContext";
import SoundsList from "./_components/SoundList";

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
                    <SoundsList />
                </FilesContextProvider>
            </div>
        </div>
    );
}
